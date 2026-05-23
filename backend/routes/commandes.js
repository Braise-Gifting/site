const express   = require('express');
const router    = express.Router();
const supabase  = require('../config/supabase');
const adminAuth = require('../middleware/adminAuth');

// Génère une référence commande : BRS-2026-XXXX
function genRef() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BRS-${year}-${rand}`;
}

// Valide le corps d'une commande entrante
function validateCommande(body) {
  const errors = [];
  if (!body.client)                        errors.push('client requis');
  if (!body.client?.nom)                   errors.push('client.nom requis');
  if (!body.client?.prenom)                errors.push('client.prenom requis');
  if (!body.client?.email)                 errors.push('client.email requis');
  if (!body.client?.telephone)             errors.push('client.telephone requis');
  if (!body.adresse_livraison)             errors.push('adresse_livraison requis');
  if (!Array.isArray(body.items) || !body.items.length) errors.push('items[] requis');
  return errors;
}

// POST /api/commandes — créer une commande
router.post('/', async (req, res) => {
  const errors = validateCommande(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const { client: clientData, items, adresse_livraison, message_perso, mode_paiement } = req.body;

  // 1. Upsert client
  const { data: client, error: clientErr } = await supabase
    .from('clients')
    .upsert({ ...clientData }, { onConflict: 'email', ignoreDuplicates: false })
    .select('id')
    .single();

  if (clientErr) return res.status(500).json({ error: clientErr.message });

  // 2. Calculer le total depuis les produits en BDD (ne pas faire confiance au frontend)
  const produitIds = items.filter(i => i.produit_id).map(i => i.produit_id);
  let prixMap = {};

  if (produitIds.length) {
    const { data: prods, error: prodsErr } = await supabase
      .from('produits')
      .select('id, prix')
      .in('id', produitIds)
      .eq('actif', true);

    if (prodsErr) return res.status(500).json({ error: prodsErr.message });
    prods.forEach(p => { prixMap[p.id] = p.prix; });
  }

  let sousTotal = 0;
  const itemsValides = items.map(item => {
    const prix = prixMap[item.produit_id] ?? item.prix_unitaire ?? 0;
    sousTotal += prix * (item.quantite || 1);
    return { ...item, prix_unitaire: prix };
  });

  const livraison = sousTotal >= 500 ? 0 : 50;
  const total = sousTotal + livraison;

  // 3. Créer la commande
  const ref = genRef();
  const { data: commande, error: cmdErr } = await supabase
    .from('commandes')
    .insert({
      ref,
      client_id: client.id,
      statut: 'en_attente',
      montant_sous_total: sousTotal,
      montant_livraison: livraison,
      montant_total: total,
      mode_paiement: mode_paiement || 'a_la_livraison',
      message_perso,
      adresse_livraison
    })
    .select('id, ref')
    .single();

  if (cmdErr) return res.status(500).json({ error: cmdErr.message });

  // 4. Insérer les lignes
  const lignes = itemsValides.map(item => ({
    commande_id: commande.id,
    produit_id:  item.produit_id  || null,
    coffret_id:  item.coffret_id  || null,
    ame_id:      item.ame_id      || null,
    quantite:    item.quantite    || 1,
    prix_unitaire: item.prix_unitaire,
    message_perso: item.message_perso || null
  }));

  const { error: lignesErr } = await supabase
    .from('commande_items')
    .insert(lignes);

  if (lignesErr) return res.status(500).json({ error: lignesErr.message });

  res.status(201).json({
    ref: commande.ref,
    total,
    livraison,
    message: 'Commande créée avec succès'
  });
});

// GET /api/commandes/:ref — récupérer une commande par sa référence
router.get('/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('commandes')
    .select(`
      id, ref, statut, montant_sous_total, montant_livraison, montant_total,
      mode_paiement, message_perso, adresse_livraison, created_at,
      client:clients ( nom, prenom, email, telephone, ville ),
      items:commande_items (
        quantite, prix_unitaire, message_perso,
        produit:produits (
          prix,
          ame:ames ( slug, nom ),
          gestuelle:gestuelle_types ( slug, nom, format )
        ),
        coffret:coffrets ( slug, nom ),
        ame:ames ( slug, nom )
      )
    `)
    .eq('ref', req.params.ref.toUpperCase())
    .single();

  if (error) return res.status(404).json({ error: 'Commande introuvable' });
  res.json(data);
});

// PATCH /api/commandes/:ref/statut — mettre à jour le statut (admin)
router.patch('/:ref/statut', adminAuth, async (req, res) => {
  const { statut } = req.body;
  const statutsValides = ['en_attente','confirmee','en_preparation','expediee','livree','annulee'];

  if (!statutsValides.includes(statut)) {
    return res.status(400).json({ error: `Statut invalide. Valeurs acceptées : ${statutsValides.join(', ')}` });
  }

  const { data, error } = await supabase
    .from('commandes')
    .update({ statut })
    .eq('ref', req.params.ref.toUpperCase())
    .select('ref, statut')
    .single();

  if (error) return res.status(404).json({ error: 'Commande introuvable' });
  res.json(data);
});

// GET /api/commandes — liste toutes les commandes (admin)
router.get('/', adminAuth, async (req, res) => {
  const { statut, page = 1, limit = 20 } = req.query;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('commandes')
    .select(`
      id, ref, statut, montant_total, mode_paiement, created_at,
      client:clients ( nom, prenom, email, telephone )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (statut) query = query.eq('statut', statut);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data, total: count, page: Number(page), limit: Number(limit) });
});

module.exports = router;
