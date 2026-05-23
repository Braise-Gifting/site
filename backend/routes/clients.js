const express   = require('express');
const router    = express.Router();
const supabase  = require('../config/supabase');
const adminAuth = require('../middleware/adminAuth');

// Toutes les routes clients sont admin-only
router.use(adminAuth);

// GET /api/clients — liste tous les clients (admin)
router.get('/', async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('clients')
    .select('id, nom, prenom, email, telephone, ville, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (search) {
    query = query.or(`nom.ilike.%${search}%,prenom.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data, total: count, page: Number(page), limit: Number(limit) });
});

// GET /api/clients/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('clients')
    .select(`
      id, nom, prenom, email, telephone, adresse, ville, notes, created_at,
      commandes:commandes ( ref, statut, montant_total, created_at )
    `)
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Client introuvable' });
  res.json(data);
});

// PATCH /api/clients/:id/notes — mettre à jour les notes internes (admin)
router.patch('/:id/notes', async (req, res) => {
  const { notes } = req.body;
  const { data, error } = await supabase
    .from('clients')
    .update({ notes })
    .eq('id', req.params.id)
    .select('id, notes')
    .single();

  if (error) return res.status(404).json({ error: 'Client introuvable' });
  res.json(data);
});

module.exports = router;
