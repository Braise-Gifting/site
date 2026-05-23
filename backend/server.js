require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 4000;

// ── Middlewares ──────────────────────────────────────────────
const origins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use(cors({ origin: origins, credentials: true }));
app.use(express.json());

// ── Admin UI (fichiers statiques) ────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// ── Pages du site Braise (développement local) ───────────────
app.use(express.static(path.join(__dirname, '..')));

// ── Routes API ───────────────────────────────────────────────
app.use('/api/admin',    require('./routes/admin'));
app.use('/api/produits', require('./routes/produits'));
app.use('/api/coffrets', require('./routes/coffrets'));
app.use('/api/commandes',require('./routes/commandes'));
app.use('/api/clients',  require('./routes/clients'));
app.use('/api/devis',    require('./routes/devis'));

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 ──────────────────────────────────────────────────────
app.use((_, res) => res.status(404).json({ error: 'Route introuvable' }));

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Braise API  → http://localhost:${PORT}`);
  console.log(`Admin       → http://localhost:${PORT}/admin`);
  console.log(`Health      → http://localhost:${PORT}/api/health`);
});
