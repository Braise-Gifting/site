import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "Braise est né d'une conviction : le Maroc mérite sa propre maison de gifting olfactif premium. Oriental contemporain, assemblé à Casablanca.",
};

const valeurs = [
  {
    titre: "L'artisanat comme ancre",
    texte:
      "Les céramiques viennent de Safi et Fès. Les fragrances sont composées et exclusivisées contractuellement. L'assemblage est fait à la main, à Casablanca. Ce n'est pas du storytelling — c'est la réalité de chaque coffret.",
  },
  {
    titre: "L'émotion comme produit",
    texte:
      "On ne vend pas des bouquets de diffusion. On vend l'intention derrière. 'Je veux que tu penses à moi.' 'Je t'offre la légèreté.' 'Je veux que tu te sentes chez toi.' Le produit est le vecteur — l'émotion est le vrai cadeau.",
  },
  {
    titre: "Le Maroc sans complexe",
    texte:
      "Oriental contemporain assumé. Racines marocaines revendiquées avec fierté, exprimées en français pur. Ni l'artisanat touristique, ni les marques européennes importées — quelque chose d'entièrement nouveau.",
  },
];

const process = [
  { num: "01", label: "Composition", texte: "Les 3 âmes olfactives sont composées par un parfumeur, exclusivisées contractuellement pour Braise." },
  { num: "02", label: "Sourcing", texte: "Flacons et sprays depuis la Turquie. Céramiques depuis les artisans de Safi et Fès. Cires végétales." },
  { num: "03", label: "Assemblage", texte: "Chaque coffret est assemblé à la main dans notre atelier à Casablanca. Aucun coffret en stock — tout est préparé à la commande." },
  { num: "04", label: "Finition", texte: "Packaging, calage tissu, carte manuscrite, ruban satiné. Chaque détail compte parce que l'expérience commence à l'ouverture." },
];

export default function NotreHistoire() {
  return (
    <>
      {/* Hero */}
      <section className="py-28 bg-[#0D0D0D]">
        <div className="container-braise max-w-3xl">
          <p className="section-label mb-8">Le manifeste</p>
          <h1
            className="heading-xl mb-10"
            style={{ color: "#F5F0EB" }}
          >
            Le feu qui ne s'éteint pas.
          </h1>
          <div className="space-y-6 text-base leading-relaxed" style={{ color: "rgba(245,240,235,0.6)" }}>
            <p>
              Il y a une absence dans le marché marocain. Entre l'artisanat
              touristique qu'on offre par obligation et les marques européennes
              inaccessibles qu'on rêve d'offrir, il n'existait rien.
            </p>
            <p>
              Rien de premium. Rien d'authentiquement marocain. Rien qui
              combines le sensoriel, l'artisanat local et l'intention derrière
              le cadeau.
            </p>
            <p style={{ color: "#C8A96E", fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}>
              Braise est né pour combler ce vide.
            </p>
            <p>
              La braise du kanoun. La chaleur du foyer marocain. Le bkhour qui
              monte et qui reste. On n'utilise pas ces mots — on en capture
              l'essence. Une image 100% marocaine, exprimée en français pur.
            </p>
            <p>
              Le parfum comme feu qui couve : invisible, mais présent partout.
              On ne vend pas des produits. On vend des intentions et des
              émotions.
            </p>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20 bg-[#161412]" style={{ borderTop: "1px solid rgba(245,240,235,0.06)" }}>
        <div className="container-braise">
          <p className="section-label mb-12">Ce qui nous définit</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {valeurs.map((v) => (
              <div key={v.titre}>
                <div className="w-8 h-px bg-[#C8A96E] mb-5" />
                <h3 className="text-base font-medium mb-4" style={{ color: "#F5F0EB" }}>
                  {v.titre}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.5)" }}>
                  {v.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre processus */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container-braise">
          <p className="section-label mb-12">De la fragrance au coffret</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p) => (
              <div key={p.num} className="flex flex-col gap-4">
                <span className="text-4xl" style={{ fontFamily: "var(--font-serif)", color: "rgba(200,169,110,0.3)", fontWeight: 400 }}>
                  {p.num}
                </span>
                <h3 className="text-sm font-medium tracking-wide uppercase" style={{ color: "#F5F0EB" }}>
                  {p.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.45)" }}>
                  {p.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#161412] text-center">
        <div className="container-braise">
          <h2 className="heading-md mb-8" style={{ color: "#F5F0EB" }}>
            Prêt à vivre l'expérience Braise ?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/les-coffrets" className="btn-or">
              Voir les coffrets
            </Link>
            <Link href="/les-ames" className="btn-outline">
              Choisir une âme olfactive
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
