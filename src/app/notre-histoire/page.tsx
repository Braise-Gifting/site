import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description: "Braise est né d'une conviction : le Maroc mérite sa propre maison de gifting olfactif premium. Oriental contemporain, assemblé à Casablanca.",
};

const M = { fontFamily: "var(--font-mono)" };

const valeurs = [
  {
    titre: "L'artisanat comme ancre",
    texte: "Les céramiques viennent de Safi et Fès. Les fragrances sont composées et exclusivisées contractuellement. L'assemblage est fait à la main, à Casablanca. Ce n'est pas du storytelling — c'est la réalité de chaque coffret.",
  },
  {
    titre: "L'émotion comme produit",
    texte: "On ne vend pas des bouquets de diffusion. On vend l'intention derrière. « Je veux que tu penses à moi. » « Je t'offre la légèreté. » « Je veux que tu te sentes chez toi. » Le produit est le vecteur — l'émotion est le vrai cadeau.",
  },
  {
    titre: "Le Maroc sans complexe",
    texte: "Oriental contemporain assumé. Racines marocaines revendiquées avec fierté, exprimées en français pur. Ni l'artisanat touristique, ni les marques européennes importées — quelque chose d'entièrement nouveau.",
  },
];

const processus = [
  { num: "01", label: "Composition", texte: "Les 3 âmes olfactives sont composées par un parfumeur, exclusivisées contractuellement pour Braise." },
  { num: "02", label: "Sourcing", texte: "Flacons et sprays depuis la Turquie. Céramiques depuis les artisans de Safi et Fès. Cires végétales." },
  { num: "03", label: "Assemblage", texte: "Chaque coffret est assemblé à la main dans notre atelier à Casablanca. Aucun coffret en stock — tout est préparé à la commande." },
  { num: "04", label: "Finition", texte: "Packaging, calage tissu, carte manuscrite, ruban satiné. Chaque détail compte parce que l'expérience commence à l'ouverture." },
];

export default function NotreHistoire() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#0D0D0D", padding: "140px var(--pad-x) clamp(80px,10vh,120px)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Le manifeste <span className="ey-line" /></div>
          <h1 className="heading-xl" style={{ color: "#F5F0EB", margin: "0 0 48px", maxWidth: "820px" }}>
            Le feu qui<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>ne s'éteint pas.</em>
          </h1>
          <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "24px", fontSize: "17px", lineHeight: 1.7, color: "var(--muted)", fontWeight: 300 }}>
            <p style={{ margin: 0 }}>
              Il y a une absence dans le marché marocain. Entre l'artisanat
              touristique qu'on offre par obligation et les marques européennes
              inaccessibles qu'on rêve d'offrir, il n'existait rien.
            </p>
            <p style={{ margin: 0 }}>
              Rien de premium. Rien d'authentiquement marocain. Rien qui combine
              le sensoriel, l'artisanat local et l'intention derrière le cadeau.
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "22px", color: "#C8A96E", lineHeight: 1.5 }}>
              Braise est né pour combler ce vide.
            </p>
            <p style={{ margin: 0 }}>
              La braise du kanoun. La chaleur du foyer marocain. Le parfum qui
              monte et qui reste. On n'utilise pas ces mots — on en capture
              l'essence. Une image 100% marocaine, exprimée en français pur.
            </p>
            <p style={{ margin: 0 }}>
              Le parfum comme feu qui couve : invisible, mais présent partout.
              On ne vend pas des produits. On vend des intentions et des émotions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section style={{ background: "#161412", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Ce qui nous définit <span className="ey-line" /></div>
          <div className="histoire-valeurs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", marginTop: "64px" }}>
            {valeurs.map((v) => (
              <div key={v.titre}>
                <div style={{ width: "32px", height: "1px", background: "#C8A96E", marginBottom: "24px" }} />
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "#F5F0EB", marginBottom: "16px", lineHeight: 1.3 }}>{v.titre}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Processus ── */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> De la fragrance au coffret <span className="ey-line" /></div>
          <div className="histoire-processus-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: "64px", borderTop: "1px solid var(--hairline)" }}>
            {processus.map((p, i) => (
              <div key={p.num} style={{ padding: "40px 32px", borderRight: i < 3 ? "1px solid var(--hairline)" : "none" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "40px", color: "rgba(200,169,110,0.2)", fontWeight: 400, lineHeight: 1, marginBottom: "24px" }}>{p.num}</div>
                <div style={{ ...M, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>{p.label}</div>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#161412", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <h2 className="heading-md" style={{ color: "#F5F0EB", margin: "0 0 32px" }}>
            Prêt à vivre<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>l'expérience Braise ?</em>
          </h2>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/les-coffrets" className="btn-or">Voir les coffrets →</Link>
            <Link href="/les-ames" className="btn-ghost">Choisir une âme</Link>
          </div>
        </div>
      </section>
    </>
  );
}
