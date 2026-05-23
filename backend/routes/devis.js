const express   = require('express');
const router    = express.Router();
const supabase  = require('../config/supabase');
const adminAuth = require('../middleware/adminAuth');

function genRef() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DEV-${year}-${rand}`;
}

// POST /api/devis — soumission depuis le formulaire Corporate (public)
router.post('/', async (req, res) => {
  const { entreprise, contact, resp_comm, telephone, email, unites, occasion, budget, date_livraison, message } = req.body;

  if (!entreprise || !contact || !telephone || !email || !unites) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  const ref = genRef();
  const { data, error } = await supabase
    .from('devis')
    .insert({ ref, entreprise, contact, resp_comm, telephone, email, unites, occasion, budget, date_livraison: date_livraison || null, message, statut: 'nouveau' })
    .select('ref')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ ref: data.ref, message: 'Demande de devis enregistrée' });
});

// GET /api/devis — liste tous les devis (admin)
router.get('/', adminAuth, async (req, res) => {
  const { statut, page = 1, limit = 50 } = req.query;
  const from = (page - 1) * limit;
  const to = from + Number(limit) - 1;

  let query = supabase
    .from('devis')
    .select('id, ref, entreprise, contact, telephone, email, unites, budget, occasion, statut, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (statut) query = query.eq('statut', statut);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data, total: count, page: Number(page), limit: Number(limit) });
});

// GET /api/devis/:ref — détail d'un devis (admin)
router.get('/:ref', adminAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('devis')
    .select('*')
    .eq('ref', req.params.ref.toUpperCase())
    .single();

  if (error) return res.status(404).json({ error: 'Devis introuvable' });
  res.json(data);
});

// PATCH /api/devis/:ref/statut — changer statut (admin)
router.patch('/:ref/statut', adminAuth, async (req, res) => {
  const { statut } = req.body;
  const valides = ['nouveau','en_cours','devis_envoye','accepte','refuse','abandonne'];
  if (!valides.includes(statut)) return res.status(400).json({ error: 'Statut invalide' });

  const { data, error } = await supabase
    .from('devis')
    .update({ statut })
    .eq('ref', req.params.ref.toUpperCase())
    .select('ref, statut')
    .single();

  if (error) return res.status(404).json({ error: 'Devis introuvable' });
  res.json(data);
});

// PATCH /api/devis/:ref/notes — notes internes (admin)
router.patch('/:ref/notes', adminAuth, async (req, res) => {
  const { notes_internes } = req.body;
  const { data, error } = await supabase
    .from('devis')
    .update({ notes_internes })
    .eq('ref', req.params.ref.toUpperCase())
    .select('ref, notes_internes')
    .single();

  if (error) return res.status(404).json({ error: 'Devis introuvable' });
  res.json(data);
});

module.exports = router;
