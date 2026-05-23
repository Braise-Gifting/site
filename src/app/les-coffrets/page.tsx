import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Coffrets",
  description: "4 coffrets assemblés à la main à Casablanca. Mariage, anniversaire, Aïd, naissance. Personnalisation incluse. Livraison rapide partout au Maroc.",
};

const M = { fontFamily: "var(--font-mono)" };

const coffrets = [
  {
    num: "01",
    name: "Pour que tu penses à moi",
    tagline: "Le cadeau de présence. Discret mais indélébile.",
    prix: "490–580",
    badge: null,
    contents: [
      { item: "Bouquet à bâtonnets 150ml",    qty: "×1" },
      { item: "Brume parfumée 100ml",          qty: "×1" },
      { item: "Carte manuscrite personnalisée", qty: "×1" },
      { item: "Packaging aimantée",            qty: "×1" },
    ],
    imgUrl: "https://images.unsplash.com/photo-1505855265981-d52719d1f64e?auto=format&fit=crop&w=1000&q=80",
    badgeStyle: null,
    reverse: false,
  },
  {
    num: "02",
    name: "Prends soin de toi ce soir",
    tagline: "Pour le rituel du soir. Poser, respirer, être.",
    prix: "580–680",
    badge: null,
    contents: [
      { item: "Bougie céramique artisanale",   qty: "×1" },
      { item: "Brûle-parfum céramique Safi",  qty: "×1" },
      { item: "Brume parfumée 100ml",          qty: "×1" },
      { item: "Packaging rigide",              qty: "×1" },
      { item: "Carte manuscrite",              qty: "×1" },
    ],
    imgUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    badgeStyle: null,
    reverse: true,
  },
  {
    num: "03",
    name: "Pour marquer ce moment",
    tagline: "Mariage, naissance, promotion. Le cadeau qui dure.",
    prix: "790–950",
    badge: "Le plus offert",
    contents: [
      { item: "Bouquet à bâtonnets 150ml",     qty: "×1" },
      { item: "Bougie céramique",              qty: "×1" },
      { item: "Recharge parfumée",             qty: "×1" },
      { item: "Brûle-parfum céramique",        qty: "×1" },
      { item: "Coffret bois laqué",            qty: "×1" },
      { item: "Message personnalisé imprimé",  qty: "×1" },
    ],
    imgUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80",
    badgeStyle: { background: "#C8A96E", color: "#0D0D0D" },
    reverse: false,
  },
  {
    num: "04",
    name: "Compose ton émotion toi-même",
    tagline: "Un cadeau expérience. Pour les curieux, les créatifs, les amoureux.",
    prix: "420–520",
    badge: "Exclusif",
    contents: [
      { item: "Flacon diffuseur vide",         qty: "×1" },
      { item: "3 fragrances Braise (5ml)",     qty: "×3" },
      { item: "Bâtonnets fibre",               qty: "×12" },
      { item: "Guide illustré de composition", qty: "×1" },
    ],
    imgUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80",
    badgeStyle: { background: "#B85C38", color: "#F5F0EB" },
    reverse: true,
  },
];

const ames = ["Layl", "Bahjat", "Assel"];

export default function LesCoffrets() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#0D0D0D", padding: "140px var(--pad-x) clamp(80px,12vh,120px)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Les coffrets <span className="ey-line" /></div>
          <h1 className="heading-xl" style={{ color: "#F5F0EB", margin: "0 0 32px", maxWidth: "820px" }}>
            Composés à la main.<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>Choisis avec intention.</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, fontWeight: 300 }}>
            Quatre coffrets, chacun pour une intention différente.
            Choisissez votre coffret, puis votre âme olfactive — Layl, Bahjat ou Assel.
          </p>
        </div>
      </section>

      {/* ── Filter bar (sticky) ── */}
      <div style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", padding: "28px var(--pad-x)", borderBottom: "1px solid var(--hairline)", position: "sticky", top: "88px", zIndex: 40 }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginRight: "8px" }}>Coffret</span>
            {["Tous", "Cadeau", "Self-care", "Événement", "Créateur"].map((f, i) => (
              <button key={f} className={`chip${i === 0 ? " active" : ""}`}>{f}</button>
            ))}
          </div>
          <div style={{ ...M, fontSize: "11px", letterSpacing: "0.16em", color: "var(--muted)" }}>
            <b style={{ color: "#C8A96E", fontWeight: 400 }}>4</b> coffrets disponibles
          </div>
        </div>
      </div>

      {/* ── Coffret rows ── */}
      <section style={{ background: "#0D0D0D", padding: "0 var(--pad-x) clamp(80px,12vh,160px)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          {coffrets.map((c, idx) => (
            <div key={c.num} className="coffret-row" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "center", padding: "100px 0", borderTop: idx === 0 ? "none" : "1px solid var(--hairline)", direction: c.reverse ? "rtl" : "ltr" }}>

              {/* Visual */}
              <div style={{ direction: "ltr", aspectRatio: "5/4", position: "relative", width: "100%" }}>
                {c.badge && (
                  <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 2, padding: "8px 14px", borderRadius: "999px", ...M, fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", ...c.badgeStyle }}>
                    {c.badge}
                  </div>
                )}
                <div className="ph-dark" style={{ width: "100%", height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.imgUrl} alt={c.name} loading="lazy" />
                </div>
              </div>

              {/* Info */}
              <div style={{ direction: "ltr" }}>
                <div style={{ ...M, fontSize: "11px", letterSpacing: "0.24em", color: "#C8A96E", textTransform: "uppercase", marginBottom: "20px" }}>
                  Coffret {c.num}
                </div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px,4.5vw,64px)", lineHeight: 1.05, color: "#F5F0EB", margin: "0 0 28px", letterSpacing: "-0.01em" }}>
                  {c.name}
                </h2>
                <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 36px", maxWidth: "480px" }}>
                  {c.tagline}
                </p>

                {/* Contents list */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", borderTop: "1px solid var(--hairline)" }}>
                  {c.contents.map((item) => (
                    <li key={item.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--hairline)", fontSize: "14px", color: "#F5F0EB" }}>
                      <span>{item.item}</span>
                      <span style={{ color: "#C8A96E", ...M, fontSize: "11px", letterSpacing: "0.12em" }}>{item.qty}</span>
                    </li>
                  ))}
                </ul>

                {/* Âme selector */}
                <div style={{ marginBottom: "36px" }}>
                  <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "12px" }}>
                    Choisir une âme
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {ames.map((ame, i) => (
                      <div key={ame} style={{ flex: 1, padding: "16px 18px", border: `1px solid ${i === 0 ? "#C8A96E" : "var(--hairline)"}`, borderRadius: "4px", background: i === 0 ? "#C8A96E" : "transparent", color: i === 0 ? "#0D0D0D" : "#F5F0EB", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "18px", lineHeight: 1 }}>{ame}</span>
                        <span style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: i === 0 ? "rgba(13,13,13,0.7)" : "var(--muted)" }}>
                          {["Nuit", "Matin", "Soir"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "36px", lineHeight: 1, color: "#F5F0EB" }}>
                      {c.prix}
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", letterSpacing: "0.2em", color: "var(--muted)", marginLeft: "6px", verticalAlign: "middle" }}>MAD</span>
                    </div>
                    <div style={{ ...M, fontSize: "11px", letterSpacing: "0.2em", color: "var(--muted-2)", textTransform: "uppercase", marginTop: "6px" }}>
                      Personnalisation incluse
                    </div>
                  </div>
                  <a href={`https://wa.me/212600000000?text=Bonjour%20Braise%2C%20je%20souhaite%20commander%20le%20Coffret%20${c.num}%20%E2%80%94%20${encodeURIComponent(c.name)}`} target="_blank" rel="noopener noreferrer" className="btn-or">
                    Commander via WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Configurateur ── */}
      <section id="configurateur" style={{ background: "#F5F0EB", color: "#0D0D0D", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 56px" }}>
            <div className="section-eyebrow dark" style={{ justifyContent: "center" }}>
              <span className="ey-line" /><span className="ey-num">—</span> Configurateur <span className="ey-line" />
            </div>
            <h2 className="heading-lg" style={{ color: "#0D0D0D", margin: "0 0 24px" }}>
              Tu ne sais pas encore ?<br />
              <em style={{ fontStyle: "italic", color: "#B85C38" }}>On t'aide à choisir.</em>
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(13,13,13,0.65)", lineHeight: 1.7, margin: "0 auto" }}>
              Réponds à 3 questions et on te recommande le coffret et l'âme parfaits pour l'occasion.
            </p>
          </div>

          <div style={{ maxWidth: "780px", margin: "0 auto", background: "#0D0D0D", color: "#F5F0EB", padding: "64px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #C8A96E, transparent)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ ...M, fontSize: "11px", letterSpacing: "0.32em", color: "#C8A96E", textTransform: "uppercase", marginBottom: "24px" }}>
                Configuration rapide
              </div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#F5F0EB", lineHeight: 1.5, marginBottom: "48px" }}>
                Parlez-nous directement sur WhatsApp — on vous conseille en 2 minutes sur le coffret et l'âme qui correspondent.
              </p>
              <a
                href="https://wa.me/212600000000?text=Bonjour%20Braise%2C%20j'aimerais%20de%20l'aide%20pour%20choisir%20le%20bon%20coffret."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-or"
              >
                Être conseillé sur WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Garanties ── */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid var(--hairline)", padding: "clamp(60px,8vh,100px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="garanties-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
            {[
              { label: "Livraison", val: "J+1 Casablanca" },
              { label: "Paiement",  val: "À la livraison" },
              { label: "Personnalisation", val: "Incluse" },
              { label: "Assemblage", val: "À la main" },
            ].map((g) => (
              <div key={g.label} style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "24px", borderLeft: "1px solid var(--hairline)" }}>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "#C8A96E", textTransform: "uppercase" }}>{g.label}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "#F5F0EB" }}>{g.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Corporate teaser ── */}
      <section style={{ background: "#161412", padding: "clamp(80px,12vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
          <div>
            <div className="section-eyebrow"><span className="ey-num">B2B</span> Corporate <span className="ey-line" /></div>
            <h2 className="heading-md" style={{ color: "#F5F0EB", margin: "0 0 16px" }}>
              Commande groupée ?<br />
              <em style={{ fontStyle: "italic", color: "#C8A96E" }}>À partir de 20 unités.</em>
            </h2>
            <p style={{ fontSize: "15px", color: "var(--muted)", maxWidth: "480px", lineHeight: 1.7 }}>
              Logo, couleurs de marque, message sur mesure. Devis gratuit en 24h.
            </p>
          </div>
          <Link href="/corporate" className="btn-or" style={{ flexShrink: 0 }}>
            Demander un devis →
          </Link>
        </div>
      </section>
    </>
  );
}
