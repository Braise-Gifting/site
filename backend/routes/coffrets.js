const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const adminAuth = require('../middleware/adminAuth');

// GET /api/coffrets — liste tous les coffrets actifs avec leur composition
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('coffrets')
    .select(`
      id, slug, nom, tagline, occasion, description, prix_min, prix_max, badge,
      items:coffret_items (
        quantite,
        gestuelle:gestuelle_types ( id, slug, nom, format )
      )
    `)
    .eq('actif', true)
    .order('ordre');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/coffrets/:slug
router.get('/:slug', async (req, res) => {
  const { data, error } = await supabase
    .from('coffrets')
    .select(`
      id, slug, nom, tagline, occasion, description, prix_min, prix_max, badge,
      items:coffret_items (
        quantite,
        gestuelle:gestuelle_types ( id, slug, nom, format, description )
      )
    `)
    .eq('slug', req.params.slug)
    .eq('actif', true)
    .single();

  if (error) return res.status(404).json({ error: 'Coffret introuvable' });
  res.json(data);
});

// PATCH /api/coffrets/:id — modifier actif, badge, prix_min, prix_max (admin)
router.patch('/:id', adminAuth, async (req, res) => {
  const allowed = ['actif', 'badge', 'prix_min', 'prix_max', 'ordre'];
  const update = {};
  allowed.forEach(k => { if (req.body[k] !== undefined) update[k] = req.body[k]; });

  if (!Object.keys(update).length) {
    return res.status(400).json({ error: 'Aucun champ valide fourni' });
  }

  const { data, error } = await supabase
    .from('coffrets')
    .update(update)
    .eq('id', req.params.id)
    .select('id, actif, badge, prix_min, prix_max, ordre')
    .single();

  if (error) return res.status(404).json({ error: 'Coffret introuvable' });
  res.json(data);
});

module.exports = router;
