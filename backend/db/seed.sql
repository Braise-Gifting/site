-- ============================================================
-- BRAISE — Données initiales (seed)
-- Coller APRÈS le schema.sql dans Supabase > SQL Editor
-- ============================================================

-- ============================================================
-- AMES
-- ============================================================
INSERT INTO ames (slug, nom, sous_titre, description, notes, couleur_hex) VALUES
  ('layl',   'Layl',   'Nuit profonde',     'Une nuit à Marrakech. Lourde, enveloppante, mémorable. Layl s''adresse à ceux qui veulent laisser une trace.',
   ARRAY['Oud', 'Ambre noir', 'Musc boisé', 'Encens', 'Cèdre de l''Atlas'], '#1A0A00'),
  ('bahjat', 'Bahjat', 'Matin lumineux',    'La légèreté d''un matin à Casablanca. Florale, fraîche, solaire. Pour offrir quelque chose qui ressemble à une promesse.',
   ARRAY['Fleur d''oranger', 'Jasmin', 'Néroli', 'Musc blanc', 'Bergamote'], '#FDF6E3'),
  ('assel',  'Assel',  'Soir enveloppant',  'La douceur du soir. Chaude, gourmande, rassurante. Pour offrir quelque chose qui dit : tu comptes.',
   ARRAY['Miel', 'Vanille', 'Fève tonka', 'Patchouli doux', 'Santal'], '#8B4513');

-- ============================================================
-- GESTUELLE_TYPES
-- ============================================================
INSERT INTO gestuelle_types (slug, nom, format, description, ordre) VALUES
  ('temoin',   'Le Témoin Silencieux', 'Bouquet 150ml',              'Un bouquet de tiges parfumées qui diffuse en continu, sans bruit, sans flamme. Pour les pièces à vivre.', 1),
  ('rituel',   'Le Rituel du Feu',     'Bougie céramique 180g',      'Une bougie en céramique artisanale à la cire de soja. 45h de combustion. Fabriquée à Casablanca.', 2),
  ('geste',    'Le Geste Rapide',      'Brume 100ml',                'Un spray textile et ambiance pour parfumer instantanément. Le format qui part partout.', 3),
  ('objet',    'L''Objet de Maison',   'Brûle-parfum + 3 pastilles', 'Un brûle-parfum en céramique avec 3 pastilles de cire à fondre. L''objet décoratif qui parfume.', 4),
  ('recharge', 'La Recharge',          'Recharge 200ml',             'La recharge pour prolonger le Témoin Silencieux ou utiliser en diffuseur électrique. 200ml.', 5);

-- ============================================================
-- PRODUITS (15 SKUs = 5 gestuelles × 3 âmes)
-- ============================================================
-- Récupération des IDs dans des CTE pour la lisibilité
WITH
  a AS (SELECT id, slug FROM ames),
  g AS (SELECT id, slug FROM gestuelle_types)
INSERT INTO produits (gestuelle_type_id, ame_id, prix, stock, actif, badge)
SELECT g.id, a.id, prix, 20, TRUE, badge
FROM (VALUES
  ('temoin',   'layl',   320, NULL),
  ('temoin',   'bahjat', 259, NULL),
  ('temoin',   'assel',  289, NULL),
  ('rituel',   'layl',   250, 'Bestseller'),
  ('rituel',   'bahjat', 199, 'Bestseller'),
  ('rituel',   'assel',  229, 'Bestseller'),
  ('geste',    'layl',   179, NULL),
  ('geste',    'bahjat', 149, NULL),
  ('geste',    'assel',  169, NULL),
  ('objet',    'layl',   310, 'Nouveau'),
  ('objet',    'bahjat', 229, 'Nouveau'),
  ('objet',    'assel',  269, 'Nouveau'),
  ('recharge', 'layl',   169, NULL),
  ('recharge', 'bahjat', 139, NULL),
  ('recharge', 'assel',  149, NULL)
) AS v(g_slug, a_slug, prix, badge)
JOIN g ON g.slug = v.g_slug
JOIN a ON a.slug = v.a_slug;

-- ============================================================
-- COFFRETS
-- ============================================================
INSERT INTO coffrets (slug, nom, tagline, occasion, description, prix_min, prix_max, badge, ordre) VALUES
  ('coffret-01', 'Coffret Essentiel',
   'L''entrée en matière. Une gestuelle, une âme.',
   'Anniversaire, remerciement, petit plaisir',
   'Le coffret pour commencer. Un format unique au choix, parfumé selon l''âme choisie. Emballage signature inclus.',
   139, 320, NULL, 1),
  ('coffret-02', 'Coffret Duo',
   'Deux gestuelles. Une intention.',
   'Anniversaire, fête, invité',
   'Deux formats complémentaires, personnalisés à la même âme ou à deux âmes différentes. Idéal pour une occasion qui compte.',
   288, 580, NULL, 2),
  ('coffret-03', 'Coffret Signature',
   'Le coffret signature. Pour les grands moments.',
   'Mariage, crémaillère, anniversaire marquant',
   'Trois gestuelles dans la boîte signature. Message imprimé sur la doublure. Assemblage premium, rubané à la main.',
   437, 870, 'Signature', 3),
  ('coffret-04', 'Coffret Maison',
   'Toute la collection. Un seul foyer.',
   'Pendaison de crémaillère, cadeau d''entreprise, anniversaire d''exception',
   'Les cinq gestuelles dans un écrin unique. La collection complète pour habiller une maison entière.',
   730, 1450, 'Collection', 4);

-- ============================================================
-- COFFRET_ITEMS (compositions indicatives)
-- ============================================================
WITH
  c AS (SELECT id, slug FROM coffrets),
  g AS (SELECT id, slug FROM gestuelle_types)
INSERT INTO coffret_items (coffret_id, gestuelle_type_id, quantite)
SELECT c.id, g.id, 1
FROM (VALUES
  -- Coffret 01 : 1 gestuelle au choix (on met la brume comme défaut)
  ('coffret-01', 'geste'),
  -- Coffret 02 : bouquet + bougie
  ('coffret-02', 'temoin'),
  ('coffret-02', 'rituel'),
  -- Coffret 03 : bouquet + bougie + brume
  ('coffret-03', 'temoin'),
  ('coffret-03', 'rituel'),
  ('coffret-03', 'geste'),
  -- Coffret 04 : toutes les gestuelles
  ('coffret-04', 'temoin'),
  ('coffret-04', 'rituel'),
  ('coffret-04', 'geste'),
  ('coffret-04', 'objet'),
  ('coffret-04', 'recharge')
) AS v(c_slug, g_slug)
JOIN c ON c.slug = v.c_slug
JOIN g ON g.slug = v.g_slug;
