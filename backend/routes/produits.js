const express   = require('express');
const router    = express.Router();
const supabase  = require('../config/supabase');
const adminAuth = require('../middleware/adminAuth');

// GET /api/produits — liste tous les produits actifs avec ame + gestuelle
router.get('/', async (req, res) => {
  const { ame, gestuelle } = req.query;

  const isAdmin = req.headers['authorization']?.includes(process.env.ADMIN_TOKEN);

  let query = supabase
    .from('produits')
    .select(`
      id, prix, stock, actif, badge,
      ame:ames ( id, slug, nom, sous_titre, couleur_hex ),
      gestuelle:gestuelle_types ( id, slug, nom, format )
    `)
    .order('prix');

  if (!isAdmin) query = query.eq('actif', true);

  if (ame)       query = query.eq('ames.slug', ame);
  if (gestuelle) query = query.eq('gestuelle_types.slug', gestuelle);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/produits/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('produits')
    .select(`
      id, prix, stock, badge,
      ame:ames ( id, slug, nom, sous_titre, description, notes, couleur_hex ),
      gestuelle:gestuelle_types ( id, slug, nom, format, description )
    `)
    .eq('id', req.params.id)
    .eq('actif', true)
    .single();

  if (error) return res.status(404).json({ error: 'Produit introuvable' });
  res.json(data);
});

// GET /api/produits/gestuelle/:slug?ame=layl
router.get('/gestuelle/:slug', async (req, res) => {
  const { ame } = req.query;

  let query = supabase
    .from('produits')
    .select(`
      id, prix, stock, badge,
      ame:ames ( id, slug, nom, sous_titre, couleur_hex ),
      gestuelle:gestuelle_types ( id, slug, nom, format )
    `)
    .eq('gestuelle_types.slug', req.params.slug)
    .eq('actif', true);

  if (ame) query = query.eq('ames.slug', ame);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// PATCH /api/produits/:id — modifier prix / stock / actif (admin)
router.patch('/:id', adminAuth, async (req, res) => {
  const allowed = ['prix', 'stock', 'actif', 'badge'];
  const update = {};
  allowed.forEach(k => { if (req.body[k] !== undefined) update[k] = req.body[k]; });

  if (!Object.keys(update).length) {
    return res.status(400).json({ error: 'Aucun champ valide fourni' });
  }

  const { data, error } = await supabase
    .from('produits')
    .update(update)
    .eq('id', req.params.id)
    .select('id, prix, stock, actif, badge')
    .single();

  if (error) return res.status(404).json({ error: 'Produit introuvable' });
  res.json(data);
});

module.exports = router;
