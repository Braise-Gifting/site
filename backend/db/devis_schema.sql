-- ============================================================
-- BRAISE — Table devis (à coller dans Supabase SQL Editor)
-- ============================================================

CREATE TABLE devis (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  ref            VARCHAR(20) UNIQUE NOT NULL,
  entreprise     VARCHAR(150) NOT NULL,
  contact        VARCHAR(100) NOT NULL,
  resp_comm      VARCHAR(100),
  telephone      VARCHAR(20) NOT NULL,
  email          VARCHAR(255) NOT NULL,
  unites         VARCHAR(50) NOT NULL,
  occasion       VARCHAR(100),
  budget         VARCHAR(50),
  date_livraison DATE,
  message        TEXT,
  statut         VARCHAR(50) NOT NULL DEFAULT 'nouveau',
  notes_internes TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT statut_devis_valide CHECK (
    statut IN ('nouveau','en_cours','devis_envoye','accepte','refuse','abandonne')
  )
);

CREATE TRIGGER trg_devis_updated_at
  BEFORE UPDATE ON devis
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE devis ENABLE ROW LEVEL SECURITY;

-- Insertion publique depuis le formulaire Corporate
CREATE POLICY "insert_devis_anon" ON devis FOR INSERT WITH CHECK (TRUE);

-- Lecture et modification réservées au service_role (backend)
CREATE POLICY "lecture_devis_service" ON devis FOR SELECT USING (TRUE);
CREATE POLICY "update_devis_service"  ON devis FOR UPDATE USING (TRUE);
