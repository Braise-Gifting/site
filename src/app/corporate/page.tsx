import type { Metadata } from "next";
import CorporateForm from "./CorporateForm";

export const metadata: Metadata = {
  title: "Cadeaux Corporate",
  description: "Coffrets olfactifs personnalisés pour entreprises. Logo, message, packaging sur mesure. À partir de 20 unités. Devis gratuit.",
};

const avantages = [
  { titre: "Packaging à votre image", texte: "Logo entreprise, couleurs de marque, message personnalisé — chaque coffret devient un ambassadeur de votre identité." },
  { titre: "À partir de 20 unités", texte: "Commandes groupées avec tarifs dégressifs. Prix dédiés aux entreprises pour tout volume." },
  { titre: "Livraison sur tout le Maroc", texte: "Casablanca, Rabat, Marrakech et tout le territoire. Livraison coordonnée pour vos événements." },
  { titre: "Délais garantis", texte: "Assemblage à la demande avec planning de production confirmé. Vos cadeaux arrivent à temps." },
];

const occasions = [
  "Cadeaux de fin d'année",
  "Onboarding collaborateurs",
  "Cadeaux clients VIP",
  "Événements corporate",
  "Séminaires et conférences",
  "Inauguration de locaux",
  "Fêtes nationales",
  "Anniversaire d'entreprise",
];

export default function Corporate() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#0D0D0D", padding: "140px var(--pad-x) clamp(80px,10vh,120px)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">B2B</span> Entreprises <span className="ey-line" /></div>
          <h1 className="heading-xl" style={{ color: "#F5F0EB", margin: "0 0 32px", maxWidth: "820px" }}>
            Votre marque mérite<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>un cadeau à sa hauteur.</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, fontWeight: 300 }}>
            Coffrets olfactifs premium personnalisés à l'image de votre entreprise.
            Pour vos collaborateurs, vos clients, vos événements. Un cadeau qu'on n'oublie pas.
          </p>
        </div>
      </section>

      {/* ── Avantages ── */}
      <section style={{ background: "#161412", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Ce que nous offrons <span className="ey-line" /></div>
          <div className="corporate-avantages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginTop: "64px" }}>
            {avantages.map((a) => (
              <div key={a.titre}>
                <div style={{ width: "32px", height: "1px", background: "#C8A96E", marginBottom: "24px" }} />
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "#F5F0EB", margin: "0 0 12px", lineHeight: 1.3 }}>{a.titre}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{a.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Occasions ── */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Pour quelles occasions <span className="ey-line" /></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "48px" }}>
            {occasions.map((o) => (
              <span key={o} style={{ padding: "12px 20px", border: "1px solid var(--hairline)", color: "var(--muted)", fontSize: "13px", letterSpacing: "0.08em" }}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Devis ── */}
      <section id="devis" style={{ background: "#161412", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Devis gratuit <span className="ey-line" /></div>
          <h2 className="heading-md" style={{ color: "#F5F0EB", margin: "32px 0 64px", maxWidth: "480px" }}>
            Parlons de<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>votre projet.</em>
          </h2>
          <div style={{ maxWidth: "720px" }}>
            <CorporateForm />
          </div>
        </div>
      </section>
    </>
  );
}
