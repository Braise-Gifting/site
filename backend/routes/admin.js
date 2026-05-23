const express   = require('express');
const router    = express.Router();
const supabase  = require('../config/supabase');
const adminAuth = require('../middleware/adminAuth');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }
  res.json({ token: process.env.ADMIN_TOKEN });
});

// GET /api/admin/stats — tableau de bord
router.get('/stats', adminAuth, async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    { count: totalCommandes },
    { data: commandesAujourd },
    { count: enAttente },
    { count: enCours },
    { data: dernieres }
  ] = await Promise.all([
    supabase.from('commandes').select('*', { count: 'exact', head: true }),
    supabase.from('commandes').select('montant_total').gte('created_at', today.toISOString()),
    supabase.from('commandes').select('*', { count: 'exact', head: true }).eq('statut', 'en_attente'),
    supabase.from('commandes').select('*', { count: 'exact', head: true }).in('statut', ['confirmee', 'en_preparation', 'expediee']),
    supabase.from('commandes')
      .select('ref, statut, montant_total, created_at, client:clients(nom, prenom)')
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  const revenuJour = (commandesAujourd || []).reduce((s, c) => s + c.montant_total, 0);

  res.json({
    total_commandes: totalCommandes || 0,
    commandes_aujourd: (commandesAujourd || []).length,
    revenu_jour: revenuJour,
    en_attente: enAttente || 0,
    en_cours: enCours || 0,
    dernieres: dernieres || []
  });
});

module.exports = router;
