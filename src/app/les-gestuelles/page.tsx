import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Gestuelles",
  description: "Cinq gestuelles olfactives signées Braise — bouquet, bougie, brume, brûle-parfum, recharge. Disponibles dans les trois âmes Layl, Bahjat, Assel.",
};

const M = { fontFamily: "var(--font-mono)" };

const gestuelles = [
  {
    ref: "G-01",
    name: "Témoin Silencieux",
    type: "Bouquet à bâtonnets",
    desc: "Sa présence dans l'entrée ou le salon dit tout. Un parfum que les visiteurs remarquent avant même de dire bonjour.",
    prix: "259–320",
    imgUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
    badge: "Best-seller",
    badgeStyle: { background: "#C8A96E", color: "#0D0D0D" },
  },
  {
    ref: "G-02",
    name: "Rituel du Feu",
    type: "Bougie céramique",
    desc: "Allumer une bougie Braise, c'est un geste. La céramique de Safi, la cire végétale, la flamme qui danse. Un rituel.",
    prix: "199–250",
    imgUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    badge: null,
    badgeStyle: null,
  },
  {
    ref: "G-03",
    name: "Geste Rapide",
    type: "Brume parfumée",
    desc: "Deux sprays sur les poignets ou dans l'air. Une façon de porter Braise sans y penser — ou d'en offrir un souvenir instantané.",
    prix: "149–179",
    imgUrl: "https://images.unsplash.com/photo-1505855265981-d52719d1f64e?auto=format&fit=crop&w=800&q=80",
    badge: "Cadeau idéal",
    badgeStyle: { background: "#B85C38", color: "#F5F0EB" },
  },
  {
    ref: "G-04",
    name: "Objet de Maison",
    type: "Brûle-parfum céramique",
    desc: "Le brûle-parfum gravé à Fès. On y pose un bâtonnet, on regarde monter la fumée. Le seul produit Braise qu'on ne consomme jamais.",
    prix: "229–310",
    imgUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    badge: null,
    badgeStyle: null,
  },
  {
    ref: "G-05",
    name: "Recharge",
    type: "Recharge parfumée",
    desc: "Pour ceux qui ont déjà leur gestuelle préférée. La fragrance seule, sans le contenant — parce que l'âme continue.",
    prix: "139–169",
    imgUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80",
    badge: null,
    badgeStyle: null,
  },
];

export default function LesGestuelles() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#0D0D0D", padding: "140px var(--pad-x) clamp(60px,8vh,100px)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Le catalogue <span className="ey-line" /></div>
          <h1 className="heading-xl" style={{ color: "#F5F0EB", margin: "0 0 32px", maxWidth: "820px" }}>
            Cinq gestuelles.<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>Une pour chaque intention.</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, fontWeight: 300 }}>
            Chaque gestuelle est une façon différente de porter ou d'offrir un parfum.
            Toutes disponibles dans les trois âmes Layl, Bahjat, Assel.
          </p>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: "28px var(--pad-x)", borderBottom: "1px solid var(--hairline)", position: "sticky", top: "88px", zIndex: 40 }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginRight: "4px" }}>Gestuelle</span>
              {["Tous", "Bouquet", "Bougie", "Brume", "Céramique", "Recharge"].map((f, i) => (
                <button key={f} className={`chip${i === 0 ? " active" : ""}`}>{f}</button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginRight: "4px" }}>Âme</span>
              {["Layl", "Bahjat", "Assel"].map((a) => (
                <button key={a} className="chip">{a}</button>
              ))}
            </div>
          </div>
          <div style={{ ...M, fontSize: "11px", letterSpacing: "0.16em", color: "var(--muted)" }}>
            <b style={{ color: "#C8A96E", fontWeight: 400 }}>5</b> gestuelles · 3 âmes
          </div>
        </div>
      </div>

      {/* ── Products grid ── */}
      <section style={{ background: "#0D0D0D", padding: "80px var(--pad-x) 160px" }}>
        <div className="gestuelles-grid" style={{ maxWidth: "var(--container)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {gestuelles.map((g) => (
            <article key={g.ref} className="product-card">
              {/* Visual */}
              <div style={{ aspectRatio: "4/4.4", position: "relative", overflow: "hidden" }}>
                <div className="ph-dark" style={{ width: "100%", height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.imgUrl} alt={g.name} loading="lazy" style={{ transition: "transform 800ms ease" }} />
                </div>
                {g.badge && (
                  <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 3, padding: "6px 10px", ...M, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", borderRadius: "2px", ...g.badgeStyle }}>
                    {g.badge}
                  </div>
                )}
                <div className="product-quick">
                  Commander via WhatsApp →
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.22em", color: "var(--muted-2)", textTransform: "uppercase" }}>{g.ref} · {g.type}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "26px", lineHeight: 1.15, color: "#F5F0EB", margin: 0 }}>{g.name}</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>{g.desc}</p>

                {/* Âme pills */}
                <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                  {["Layl", "Bahjat", "Assel"].map((a, i) => (
                    <div key={a} style={{ flex: 1, padding: "6px 8px", border: `1px solid ${i === 0 ? "#C8A96E" : "var(--hairline)"}`, borderRadius: "999px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: i === 0 ? "#C8A96E" : "var(--muted)", textAlign: "center", cursor: "pointer" }}>
                      {a}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "16px", borderTop: "1px solid var(--hairline)", marginTop: "8px" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#F5F0EB", lineHeight: 1 }}>
                    {g.prix}
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.18em", color: "var(--muted-2)", marginLeft: "4px" }}>MAD</span>
                  </div>
                  <a
                    href={`https://wa.me/212600000000?text=Bonjour%20Braise%2C%20je%20souhaite%20commander%20%22${encodeURIComponent(g.name)}%22`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-plus-link"
                  >
                    →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA coffrets ── */}
      <section style={{ background: "#161412", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <p style={{ ...M, fontSize: "11px", letterSpacing: "0.32em", color: "#C8A96E", textTransform: "uppercase", marginBottom: "24px" }}>Passer à l'étape suivante</p>
          <h2 className="heading-md" style={{ color: "#F5F0EB", margin: "0 0 32px" }}>
            Combine ta gestuelle préférée<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>dans un coffret complet.</em>
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
