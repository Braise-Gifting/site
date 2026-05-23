import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Braise — commandes, personnalisation, B2B. WhatsApp, email ou Instagram.",
};

const M = { fontFamily: "var(--font-mono)" };

const canaux = [
  {
    label: "WhatsApp",
    valeur: "Commander directement",
    detail: "Le canal le plus rapide pour les commandes et questions. On répond en moins d'une heure.",
    href: "https://wa.me/212600000000?text=Bonjour%20Braise%2C%20j'ai%20une%20question.",
    cta: "Ouvrir WhatsApp →",
  },
  {
    label: "Email",
    valeur: "contact@braise.ma",
    detail: "Pour les demandes corporate, partenariats et questions générales. Réponse sous 24h.",
    href: "mailto:contact@braise.ma",
    cta: "Envoyer un email →",
  },
  {
    label: "Instagram",
    valeur: "@braise.ma",
    detail: "Pour découvrir les coulisses, les nouveautés et l'univers Braise au quotidien.",
    href: "https://instagram.com/braise.ma",
    cta: "Suivre sur Instagram →",
  },
];

const faq = [
  {
    q: "Quels sont vos délais de livraison ?",
    r: "Casablanca : J+1. Reste du Maroc : J+3. Chaque coffret est assemblé à la commande — comptez 24h pour la préparation.",
  },
  {
    q: "Puis-je personnaliser le message dans le coffret ?",
    r: "Oui, tous nos coffrets incluent une carte personnalisée. Envoyez-nous votre message au moment de la commande via WhatsApp.",
  },
  {
    q: "Quelle âme olfactive choisir ?",
    r: "Layl pour une présence enveloppante (oud, ambre). Bahjat pour la légèreté florale. Assel pour la chaleur douce (miel, vanille). En cas de doute, WhatsApp-nous — on vous guide.",
  },
  {
    q: "Proposez-vous des commandes corporate ?",
    r: "Oui, à partir de 20 unités avec packaging personnalisé à votre image. Consultez notre page Corporate ou contactez-nous directement.",
  },
  {
    q: "Vos produits sont-ils disponibles en boutique ?",
    r: "Pour l'instant, Braise est 100% en ligne avec livraison sur tout le Maroc. Un espace à Casablanca est en projet.",
  },
];

export default function Contact() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#0D0D0D", padding: "140px var(--pad-x) clamp(80px,10vh,120px)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> On est là <span className="ey-line" /></div>
          <h1 className="heading-xl" style={{ color: "#F5F0EB", margin: "0 0 32px", maxWidth: "620px" }}>
            Parlons-nous.
          </h1>
          <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 300 }}>
            Pour commander, personnaliser un coffret, ou simplement poser une
            question — WhatsApp est le moyen le plus rapide.
          </p>
        </div>
      </section>

      {/* ── Canaux ── */}
      <section style={{ background: "#161412", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="contact-canaux-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {canaux.map((c) => (
              <div key={c.label} style={{ display: "flex", flexDirection: "column", padding: "40px 36px", border: "1px solid var(--hairline)", background: "#0D0D0D" }}>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.32em", color: "#C8A96E", textTransform: "uppercase", marginBottom: "20px" }}>{c.label}</div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#F5F0EB", margin: "0 0 16px", lineHeight: 1.3 }}>{c.valeur}</p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 40px", flex: 1 }}>{c.detail}</p>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ alignSelf: "flex-start" }}>{c.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,10vh,120px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Questions fréquentes <span className="ey-line" /></div>
          <div style={{ maxWidth: "720px", marginTop: "64px" }}>
            {faq.map((item, i) => (
              <div key={i} style={{ padding: "32px 0", borderBottom: "1px solid var(--hairline)" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, color: "#F5F0EB", margin: "0 0 16px" }}>{item.q}</h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
