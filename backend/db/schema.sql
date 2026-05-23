-- ============================================================
-- BRAISE — Schéma base de données Supabase
-- Coller dans Supabase > SQL Editor > New query > Run
-- ============================================================

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- AMES (fragrances / âmes olfactives)
-- ============================================================
CREATE TABLE ames (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        VARCHAR(50) UNIQUE NOT NULL,
  nom         VARCHAR(100) NOT NULL,
  sous_titre  VARCHAR(255),
  description TEXT,
  notes       TEXT[],
  couleur_hex VARCHAR(7),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GESTUELLE_TYPES (formats de produits)
-- ============================================================
CREATE TABLE gestuelle_types (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        VARCHAR(50) UNIQUE NOT NULL,
  nom         VARCHAR(100) NOT NULL,
  format      VARCHAR(150),
  description TEXT,
  ordre       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUITS (SKUs = gestuelle × ame)
-- ============================================================
CREATE TABLE produits (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  gestuelle_type_id   UUID        NOT NULL REFERENCES gestuelle_types(id) ON DELETE RESTRICT,
  ame_id              UUID        NOT NULL REFERENCES ames(id) ON DELETE RESTRICT,
  prix                INTEGER     NOT NULL,
  stock               INTEGER     NOT NULL DEFAULT 0,
  actif               BOOLEAN     NOT NULL DEFAULT TRUE,
  badge               VARCHAR(50),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(gestuelle_type_id, ame_id)
);

-- ============================================================
-- COFFRETS (boîtes cadeaux pré-configurées)
-- ============================================================
CREATE TABLE coffrets (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        VARCHAR(50) UNIQUE NOT NULL,
  nom         VARCHAR(100) NOT NULL,
  tagline     TEXT,
  occasion    VARCHAR(255),
  description TEXT,
  prix_min    INTEGER,
  prix_max    INTEGER,
  badge       VARCHAR(50),
  actif       BOOLEAN     NOT NULL DEFAULT TRUE,
  ordre       INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COFFRET_ITEMS (composition des coffrets)
-- ============================================================
CREATE TABLE coffret_items (
  id                UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  coffret_id        UUID    NOT NULL REFERENCES coffrets(id) ON DELETE CASCADE,
  gestuelle_type_id UUID    NOT NULL REFERENCES gestuelle_types(id) ON DELETE RESTRICT,
  quantite          INTEGER NOT NULL DEFAULT 1
);

-- ============================================================
-- CLIENTS
-- ============================================================
CREATE TABLE clients (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  nom        VARCHAR(100) NOT NULL,
  prenom     VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  telephone  VARCHAR(20),
  adresse    TEXT,
  ville      VARCHAR(100) DEFAULT 'Casablanca',
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMMANDES
-- ============================================================
CREATE TABLE commandes (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  ref                VARCHAR(20) UNIQUE NOT NULL,
  client_id          UUID        REFERENCES clients(id) ON DELETE SET NULL,
  statut             VARCHAR(50) NOT NULL DEFAULT 'en_attente',
  montant_sous_total INTEGER     NOT NULL,
  montant_livraison  INTEGER     NOT NULL DEFAULT 0,
  montant_total      INTEGER     NOT NULL,
  mode_paiement      VARCHAR(50) NOT NULL DEFAULT 'a_la_livraison',
  message_perso      TEXT,
  adresse_livraison  TEXT,
  notes_internes     TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT statut_valide CHECK (
    statut IN ('en_attente','confirmee','en_preparation','expediee','livree','annulee')
  )
);

-- ============================================================
-- COMMANDE_ITEMS (lignes de commande)
-- ============================================================
CREATE TABLE commande_items (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_id     UUID    NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
  produit_id      UUID    REFERENCES produits(id) ON DELETE SET NULL,
  ame_id          UUID    REFERENCES ames(id) ON DELETE SET NULL,
  coffret_id      UUID    REFERENCES coffrets(id) ON DELETE SET NULL,
  quantite        INTEGER NOT NULL DEFAULT 1,
  prix_unitaire   INTEGER NOT NULL,
  message_perso   TEXT
);

-- ============================================================
-- FONCTION auto updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_produits_updated_at
  BEFORE UPDATE ON produits
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_commandes_updated_at
  BEFORE UPDATE ON commandes
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (lecture publique, écriture authentifiée)
-- ============================================================
ALTER TABLE ames               ENABLE ROW LEVEL SECURITY;
ALTER TABLE gestuelle_types    ENABLE ROW LEVEL SECURITY;
ALTER TABLE produits           ENABLE ROW LEVEL SECURITY;
ALTER TABLE coffrets           ENABLE ROW LEVEL SECURITY;
ALTER TABLE coffret_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients            ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE commande_items     ENABLE ROW LEVEL SECURITY;

-- Lecture publique sur le catalogue
CREATE POLICY "lecture_publique_ames"            ON ames            FOR SELECT USING (TRUE);
CREATE POLICY "lecture_publique_gestuelle_types" ON gestuelle_types FOR SELECT USING (TRUE);
CREATE POLICY "lecture_publique_produits"        ON produits        FOR SELECT USING (actif = TRUE);
CREATE POLICY "lecture_publique_coffrets"        ON coffrets        FOR SELECT USING (actif = TRUE);
CREATE POLICY "lecture_publique_coffret_items"   ON coffret_items   FOR SELECT USING (TRUE);

-- Insertion client depuis le frontend (anon)
CREATE POLICY "insert_client_anon" ON clients FOR INSERT WITH CHECK (TRUE);

-- Insertion commande depuis le frontend (anon)
CREATE POLICY "insert_commande_anon"       ON commandes       FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "insert_commande_items_anon" ON commande_items  FOR INSERT WITH CHECK (TRUE);

-- Lecture commande par ref (pour la page de confirmation)
CREATE POLICY "lecture_commande_par_ref"
  ON commandes FOR SELECT
  USING (TRUE);

CREATE POLICY "lecture_commande_items"
  ON commande_items FOR SELECT
  USING (TRUE);

-- Admin (service_role) peut tout faire — implicitement via bypass RLS

-- ============================================================
-- DEVIS CORPORATE (demandes de devis entreprise)
-- ============================================================
CREATE TABLE devis_corporate (
  id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  ref                 VARCHAR(20)  UNIQUE NOT NULL,
  entreprise          VARCHAR(200) NOT NULL,
  nom_contact         VARCHAR(200) NOT NULL,
  resp_communication  VARCHAR(200),
  telephone           VARCHAR(50)  NOT NULL,
  email               VARCHAR(255) NOT NULL,
  nombre_unites       VARCHAR(50)  NOT NULL,
  occasion            VARCHAR(100),
  budget_unitaire     VARCHAR(50)  NOT NULL,
  date_souhaitee      DATE,
  message             TEXT,
  statut              VARCHAR(50)  NOT NULL DEFAULT 'nouveau',
  created_at          TIMESTAMPTZ  DEFAULT NOW(),
  CONSTRAINT statut_devis_check CHECK (
    statut IN ('nouveau','contacte','devis_envoye','accepte','refuse')
  )
);

ALTER TABLE devis_corporate ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_devis_anon"   ON devis_corporate FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "lecture_devis_admin" ON devis_corporate FOR SELECT  USING (TRUE);
