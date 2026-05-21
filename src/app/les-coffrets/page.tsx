import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Coffrets",
  description:
    "4 coffrets olfactifs Braise assemblés à la main. De 420 à 950 MAD. Personnalisés avec votre message.",
};

const coffrets = [
  {
    id: "01",
    nom: "Pour que tu penses à moi",
    prix: "490 – 580 MAD",
    marge: "~64% marge",
    occasion: ["Universel", "Merci", "Petite attention"],
    contenu: [
      "Bouquet à bâtonnets 150ml",
      "Brume d'ambiance 100ml",
      "Boîte aimantée noire",
      "Ruban satiné",
      "Carte manuscrite",
    ],
    description:
      "Le cadeau qui dit tout sans un mot. Simple, élégant, mémorable. Votre choix d'âme olfactive, assemblé avec soin.",
    highlight: false,
  },
  {
    id: "02",
    nom: "Prends soin de toi ce soir",
    prix: "580 – 680 MAD",
    marge: "~62% marge",
    occasion: ["Self-care", "Burnout", "Repos mérité"],
    contenu: [
      "Bougie céramique 180g",
      "Brûle-parfum artisanal",
      "3 pastilles de cire",
      "Brume d'ambiance 100ml",
      "Boîte rigide premium",
      "Calage tissu + carte",
    ],
    description:
      "Pour dire à quelqu'un que son repos compte. Un rituel complet pour transformer une soirée ordinaire en moment de grâce.",
    highlight: false,
  },
  {
    id: "03",
    nom: "Pour marquer ce moment",
    prix: "790 – 950 MAD",
    marge: "~60% marge",
    occasion: ["Mariage", "Naissance", "Promotion", "Retraite"],
    contenu: [
      "Bouquet à bâtonnets 150ml",
      "Bougie céramique 180g",
      "Recharge concentrée 200ml",
      "Brûle-parfum céramique",
      "Coffret bois laqué",
      "Calage tissu",
      "Message personnalisé imprimé",
    ],
    description:
      "Le coffret des grands moments. Pour les événements qui méritent d'être immortalisés par une émotion olfactive.",
    highlight: true,
  },
  {
    id: "04",
    nom: "Compose ton émotion toi-même",
    prix: "420 – 520 MAD",
    marge: "~66% marge",
    occasion: ["Cadeau expérience", "DIY", "Curieux", "Atelier"],
    contenu: [
      "Flacon vide design 150ml",
      "3 fragrances concentrées (Layl, Bahjat, Assel)",
      "Bâtonnets rotin",
      "Pipette doseur",
      "Guide illustré",
      "Boîte kraft premium",
      "Étiquette vierge personnalisable",
    ],
    description:
      "L'unique kit créateur au Maroc. Laissez le destinataire composer sa propre âme olfactive. Un cadeau expérience qui n'existe nulle part ailleurs.",
    highlight: false,
  },
];

const ames = ["Layl", "Bahjat", "Assel"];

export default function LesCoffrets() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-[#0D0D0D]" style={{ borderBottom: "1px solid rgba(245,240,235,0.06)" }}>
        <div className="container-braise">
          <p className="section-label mb-6">Assemblés à la main</p>
          <h1 className="heading-xl max-w-2xl mb-6" style={{ color: "#F5F0EB" }}>
            Les Coffrets Braise
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(245,240,235,0.55)" }}>
            Quatre coffrets, quatre intentions. Chacun assemblé à la main à
            Casablanca, personnalisé avec votre choix d'âme olfactive et votre
            message.
          </p>
        </div>
      </section>

      {/* Coffrets grid */}
      <section className="py-20 bg-[#161412]">
        <div className="container-braise">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coffrets.map((c) => (
              <div
                key={c.id}
                className="flex flex-col p-8 relative"
                style={{
                  background: c.highlight ? "rgba(200,169,110,0.05)" : "#0D0D0D",
                  border: `1px solid ${c.highlight ? "rgba(200,169,110,0.25)" : "rgba(245,240,235,0.08)"}`,
                }}
              >
                {c.highlight && (
                  <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="btn-or text-[9px] py-1.5 px-4">Le plus offert</span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs tracking-widest" style={{ color: "rgba(245,240,235,0.25)" }}>
                    Coffret {c.id}
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {c.occasion.slice(0, 2).map((o) => (
                      <span
                        key={o}
                        className="text-[10px] px-2 py-0.5 tracking-wide"
                        style={{ border: "1px solid rgba(245,240,235,0.1)", color: "rgba(245,240,235,0.4)" }}
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>

                <h2
                  className="text-2xl mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB", fontWeight: 400 }}
                >
                  {c.nom}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(245,240,235,0.5)" }}>
                  {c.description}
                </p>

                {/* Contenu */}
                <div className="mb-6">
                  <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "rgba(245,240,235,0.3)" }}>
                    Contenu
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {c.contenu.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(245,240,235,0.45)" }}>
                        <span style={{ color: "#C8A96E", fontSize: "10px" }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Âme selector */}
                <div className="mb-8">
                  <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "rgba(245,240,235,0.3)" }}>
                    Choisir une âme
                  </p>
                  <div className="flex gap-2">
                    {ames.map((ame) => (
                      <span
                        key={ame}
                        className="text-xs px-3 py-1.5 cursor-pointer transition-colors"
                        style={{ border: "1px solid rgba(245,240,235,0.15)", color: "rgba(245,240,235,0.5)" }}
                      >
                        {ame}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                  <span className="text-lg font-medium" style={{ color: "#C8A96E" }}>
                    {c.prix}
                  </span>
                  <a
                    href={`https://wa.me/212600000000?text=Bonjour%20Braise%2C%20je%20voudrais%20commander%20le%20coffret%20"${encodeURIComponent(c.nom)}".`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-or text-[10px] py-3 px-6"
                  >
                    Commander
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personnalisation */}
      <section className="py-20 bg-[#0D0D0D] text-center">
        <div className="container-braise max-w-2xl mx-auto">
          <p className="section-label mb-4">Personnalisation</p>
          <h2 className="heading-md mb-6" style={{ color: "#F5F0EB" }}>
            Chaque coffret est unique
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(245,240,235,0.5)" }}>
            Message personnalisé, choix d'âme olfactive, gravure, packaging aux
            couleurs de votre entreprise — tout est possible. Contactez-nous sur
            WhatsApp pour en parler.
          </p>
          <a
            href="https://wa.me/212600000000?text=Bonjour%20Braise%2C%20je%20voudrais%20personaliser%20un%20coffret."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-or"
          >
            Personnaliser mon coffret
          </a>
        </div>
      </section>
    </>
  );
}
