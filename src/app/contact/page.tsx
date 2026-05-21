import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Braise — commandes, personnalisation, B2B. WhatsApp, email ou Instagram.",
};

const canaux = [
  {
    label: "WhatsApp",
    valeur: "Commander directement",
    detail: "Le canal le plus rapide pour les commandes et questions.",
    href: "https://wa.me/212600000000?text=Bonjour%20Braise%2C%20j'ai%20une%20question.",
    cta: "Ouvrir WhatsApp",
  },
  {
    label: "Email",
    valeur: "contact@braise.ma",
    detail: "Pour les demandes corporate, partenariats et questions générales.",
    href: "mailto:contact@braise.ma",
    cta: "Envoyer un email",
  },
  {
    label: "Instagram",
    valeur: "@braise.ma",
    detail: "Pour découvrir les coulisses, les nouveautés et l'univers Braise.",
    href: "https://instagram.com/braise.ma",
    cta: "Suivre sur Instagram",
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
      {/* Hero */}
      <section className="py-24 bg-[#0D0D0D]" style={{ borderBottom: "1px solid rgba(245,240,235,0.06)" }}>
        <div className="container-braise">
          <p className="section-label mb-6">On est là</p>
          <h1 className="heading-xl max-w-2xl mb-6" style={{ color: "#F5F0EB" }}>
            Parlons-nous
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(245,240,235,0.55)" }}>
            Pour commander, personnaliser un coffret, ou simplement poser une
            question — WhatsApp est le moyen le plus rapide.
          </p>
        </div>
      </section>

      {/* Canaux */}
      <section className="py-20 bg-[#161412]">
        <div className="container-braise">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {canaux.map((c) => (
              <div
                key={c.label}
                className="flex flex-col p-8"
                style={{ border: "1px solid rgba(245,240,235,0.08)", background: "#0D0D0D" }}
              >
                <p className="section-label mb-3">{c.label}</p>
                <p className="text-base mb-3" style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB" }}>
                  {c.valeur}
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(245,240,235,0.45)" }}>
                  {c.detail}
                </p>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn-outline self-start mt-auto">
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container-braise max-w-2xl mx-auto">
          <p className="section-label mb-10">Questions fréquentes</p>
          <div className="flex flex-col gap-0">
            {faq.map((item, i) => (
              <div
                key={i}
                className="py-7"
                style={{ borderBottom: "1px solid rgba(245,240,235,0.07)" }}
              >
                <h3 className="text-sm font-medium mb-3" style={{ color: "#F5F0EB" }}>
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.5)" }}>
                  {item.r}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
