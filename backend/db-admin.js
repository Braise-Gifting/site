#!/usr/bin/env node
// db-admin.js — Contrôle direct de la base Braise
// Usage: node db-admin.js <commande> [args...]
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
);

const TABLES = ['ames', 'gestuelle_types', 'produits', 'coffrets', 'coffret_items', 'clients', 'commandes', 'commande_items'];
const [,, cmd, ...args] = process.argv;

async function main() {
  switch (cmd) {

    // Liste les tables disponibles
    case 'tables': {
      console.log('Tables:\n' + TABLES.map(t => `  • ${t}`).join('\n'));
      break;
    }

    // Vue d'ensemble des comptages
    case 'stats': {
      const results = await Promise.all(
        TABLES.map(t => supabase.from(t).select('*', { count: 'exact', head: true }))
      );
      console.log('Braise — état de la base:');
      TABLES.forEach((t, i) => {
        const { count, error } = results[i];
        console.log(`  ${t.padEnd(22)} ${error ? '⚠ ' + error.message : count + ' ligne(s)'}`);
      });
      break;
    }

    // SELECT — node db-admin.js select <table> [--limit N] [--filter col=val] [--order col[:desc]]
    case 'select': {
      const table = args[0];
      if (!table) return console.error('Usage: select <table> [--limit N] [--filter col=val] [--order col[:desc]]');
      let query = supabase.from(table).select('*');
      for (let i = 1; i < args.length; i++) {
        if (args[i] === '--limit') query = query.limit(parseInt(args[++i]));
        if (args[i] === '--filter') {
          const eqIdx = args[++i].indexOf('=');
          query = query.eq(args[i].slice(0, eqIdx), args[i].slice(eqIdx + 1));
        }
        if (args[i] === '--order') {
          const [col, dir] = args[++i].split(':');
          query = query.order(col, { ascending: dir !== 'desc' });
        }
      }
      const { data, error } = await query;
      if (error) return console.error('Erreur:', error.message);
      console.log(JSON.stringify(data, null, 2));
      console.error(`\n→ ${data.length} résultat(s)`);
      break;
    }

    // COUNT — node db-admin.js count <table> [--filter col=val]
    case 'count': {
      const table = args[0];
      if (!table) return console.error('Usage: count <table>');
      let query = supabase.from(table).select('*', { count: 'exact', head: true });
      for (let i = 1; i < args.length; i++) {
        if (args[i] === '--filter') {
          const eqIdx = args[++i].indexOf('=');
          query = query.eq(args[i].slice(0, eqIdx), args[i].slice(eqIdx + 1));
        }
      }
      const { count, error } = await query;
      if (error) return console.error('Erreur:', error.message);
      console.log(`${table}: ${count}`);
      break;
    }

    // INSERT — node db-admin.js insert <table> '<json>'
    case 'insert': {
      const [table, jsonStr] = args;
      if (!table || !jsonStr) return console.error('Usage: insert <table> \'<json>\'');
      const payload = JSON.parse(jsonStr);
      const { data, error } = await supabase.from(table).insert(payload).select();
      if (error) return console.error('Erreur:', error.message);
      console.log('Inséré:', JSON.stringify(data, null, 2));
      break;
    }

    // UPDATE — node db-admin.js update <table> <id> '<json>'
    case 'update': {
      const [table, id, jsonStr] = args;
      if (!table || !id || !jsonStr) return console.error('Usage: update <table> <id> \'<json>\'');
      const updates = JSON.parse(jsonStr);
      const { data, error } = await supabase.from(table).update(updates).eq('id', id).select();
      if (error) return console.error('Erreur:', error.message);
      console.log('Mis à jour:', JSON.stringify(data, null, 2));
      break;
    }

    // UPSERT — node db-admin.js upsert <table> '<json>'
    case 'upsert': {
      const [table, jsonStr] = args;
      if (!table || !jsonStr) return console.error('Usage: upsert <table> \'<json>\'');
      const payload = JSON.parse(jsonStr);
      const { data, error } = await supabase.from(table).upsert(payload).select();
      if (error) return console.error('Erreur:', error.message);
      console.log('Upserted:', JSON.stringify(data, null, 2));
      break;
    }

    // DELETE — node db-admin.js delete <table> <id>
    case 'delete': {
      const [table, id] = args;
      if (!table || !id) return console.error('Usage: delete <table> <id>');
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) return console.error('Erreur:', error.message);
      console.log(`Supprimé: ${table} #${id}`);
      break;
    }

    // SQL brut via Management API — node db-admin.js sql '<query>'
    case 'sql': {
      const query = args.join(' ');
      if (!query) return console.error('Usage: sql \'<query>\'');
      const token = process.env.SUPABASE_SECRET_KEY;
      if (!token) {
        console.error('⚠  SUPABASE_SECRET_KEY manquant dans .env');
        console.error('   → Crée un token sur https://supabase.com/dashboard/account/tokens');
        console.error('   → Ajoute SUPABASE_SECRET_KEY=<token> dans .env');
        process.exit(1);
      }
      const ref = process.env.SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
      const resp = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const result = await resp.json();
      if (!resp.ok) return console.error('Erreur Management API:', JSON.stringify(result, null, 2));
      console.log(JSON.stringify(result, null, 2));
      break;
    }

    default:
      console.log(`
db-admin.js — Contrôle direct base Braise

  tables                               Liste les tables
  stats                                Comptage de toutes les tables
  select  <table> [options]            Lire des données
    --limit N                          Limiter à N résultats
    --filter col=val                   Filtrer par colonne
    --order col[:desc]                 Trier
  count   <table> [--filter col=val]   Compter
  insert  <table> '<json>'             Insérer
  update  <table> <id> '<json>'        Modifier
  upsert  <table> '<json>'             Insérer ou modifier
  delete  <table> <id>                 Supprimer
  sql     '<query>'                    SQL brut (nécessite SUPABASE_MANAGEMENT_TOKEN)

Exemples:
  node db-admin.js stats
  node db-admin.js select commandes --filter statut=en_attente --order created_at:desc --limit 10
  node db-admin.js update commandes <uuid> '{"statut":"confirmee"}'
  node db-admin.js insert ames '{"slug":"rose","nom":"La Rose","notes":["rose","oud"]}'
  node db-admin.js sql 'SELECT statut, COUNT(*) FROM commandes GROUP BY statut'
`);
  }
}

main().catch(err => { console.error(err.message); process.exit(1); });
