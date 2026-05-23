const API = 'http://localhost:4000/api';
const TOKEN_KEY = 'braise_admin_token';

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function setToken(t) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` };
}

async function apiFetch(path, opts = {}) {
  const res = await fetch(API + path, {
    headers: authHeaders(),
    ...opts
  });
  if (res.status === 401) { clearToken(); location.href = '/admin/login.html'; return null; }
  return res.json();
}

// Redirige vers login si pas de token
function requireAuth() {
  if (!getToken()) { location.href = '/admin/login.html'; }
}

// Badge HTML selon statut
const STATUTS = {
  en_attente:    { label: 'En attente',    cls: 'badge-attente' },
  confirmee:     { label: 'Confirmée',     cls: 'badge-confirmee' },
  en_preparation:{ label: 'En préparation',cls: 'badge-preparation' },
  expediee:      { label: 'Expédiée',      cls: 'badge-expediee' },
  livree:        { label: 'Livrée',        cls: 'badge-livree' },
  annulee:       { label: 'Annulée',       cls: 'badge-annulee' }
};

function statutBadge(statut) {
  const s = STATUTS[statut] || { label: statut, cls: '' };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}

// Format date FR
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function fmtMontant(n) {
  return (n || 0).toLocaleString('fr-FR') + ' MAD';
}

// Marque le lien actif dans la sidebar
function setActiveNav() {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

// Logout
function logout() {
  clearToken();
  location.href = '/admin/login.html';
}

window.apiFetch    = apiFetch;
window.requireAuth = requireAuth;
window.getToken    = getToken;
window.setToken    = setToken;
window.clearToken  = clearToken;
window.statutBadge = statutBadge;
window.fmtDate     = fmtDate;
window.fmtDateTime = fmtDateTime;
window.fmtMontant  = fmtMontant;
window.setActiveNav= setActiveNav;
window.logout      = logout;
window.STATUTS     = STATUTS;
