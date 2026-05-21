import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Braise — Le feu qui ne s'éteint pas",
  description:
    "Braise crée des coffrets olfactifs premium assemblés à la main à Casablanca. Offrez une émotion, pas un objet.",
};

const ames = [
  {
    num: "01",
    nom: "Layl",
    arabe: "لَيْل",
    notes: "Oud · Ambre chaud · Musc noir · Cèdre",
    emotion: "Je veux que tu penses à moi même quand je suis parti.",
    couleur: "#B85C38",
  },
  {
    num: "02",
    nom: "Bahjat",
    arabe: "بَهْجَة",
    notes: "Fleur d'oranger · Jasmin · Musc blanc · Bergamote",
    emotion: "Je t'offre la légèreté que tu mérites.",
    couleur: "#C8A96E",
  },
  {
    num: "03",
    nom: "Assel",
    arabe: "عَسَل",
    notes: "Miel chaud · Vanille · Santal · Fève tonka",
    emotion: "Je veux que tu te sentes chez toi, où que tu sois.",
    couleur: "#8B7355",
  },
];

const coffrets = [
  {
    nom: "Pour que tu penses à moi",
    prix: "490–580 MAD",
    contenu: "Bouquet Présence · Brume Instant · Packaging aimantée",
    occasion: "Universel",
  },
  {
    nom: "Prends soin de toi ce soir",
    prix: "580–680 MAD",
    contenu: "Bougie · Brûle-parfum céramique · Brume · Packaging rigide",
    occasion: "Self-care",
  },
  {
    nom: "Pour marquer ce moment",
    prix: "790–950 MAD",
    contenu: "Coffret bois laqué · 3 produits · Message personnalisé",
    occasion: "Mariage · Naissance · Promotion",
  },
  {
    nom: "Compose ton émotion",
    prix: "420–520 MAD",
    contenu: "Kit Créateur DIY · 3 fragrances · Guide illustré",
    occasion: "Cadeau expérience",
  },
];

const raisons = [
  {
    titre: "Un expert qui connaît les âmes",
    texte:
      "Chaque coffret est pensé pour l'occasion, la personne, l'émotion. Pas un produit générique — une intention.",
  },
  {
    titre: "L'artisanat marocain réinventé",
    texte:
      "Céramiques de Safi et Fès, fragrances exclusives, assemblage à la main. La qualité que vous méritez.",
  },
  {
    titre: "Le parfum qui reste",
    texte:
      "Dans la maison, la voiture, les vêtements — un parfum unique vous rend présent même quand vous ne l'êtes pas.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#0D0D0D] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 70% 50%, rgba(184,92,56,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 20% 80%, rgba(200,169,110,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container-braise relative z-10 py-32">
          <p className="section-label mb-8">Casablanca · Maroc</p>
          <h1 className="heading-xl max-w-3xl mb-8" style={{ color: "#F5F0EB" }}>
            Offrez une émotion,
            <br />
            <em style={{ color: "#C8A96E" }}>pas un objet.</em>
          </h1>
          <p className="text-lg max-w-xl mb-12 leading-relaxed" style={{ color: "rgba(245,240,235,0.6)", fontWeight: 300 }}>
            Braise compose des coffrets olfactifs premium à la main. Parce que
            les vrais cadeaux ne s'oublient pas — ils restent dans l'air,
            longtemps après.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/les-coffrets" className="btn-or">
              Découvrir les coffrets
            </Link>
            <Link href="/les-ames" className="btn-outline">
              Choisir mon âme olfactive
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#C8A96E] opacity-60" />
        </div>
      </section>

      {/* Différenciation */}
      <section className="py-20 bg-[#161412]" style={{ borderTop: "1px solid rgba(245,240,235,0.06)" }}>
        <div className="container-braise">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {raisons.map((r) => (
              <div key={r.titre} className="flex flex-col gap-3">
                <div className="w-8 h-px bg-[#C8A96E]" />
                <h3 className="text-base font-medium" style={{ color: "#F5F0EB" }}>
                  {r.titre}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.5)" }}>
                  {r.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Les 3 Âmes */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container-braise">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="section-label mb-4">Les âmes olfactives</p>
              <h2 className="heading-lg" style={{ color: "#F5F0EB" }}>
                Choisissez votre intention
              </h2>
            </div>
            <Link href="/les-ames" className="btn-outline self-start md:self-auto">
              Voir toutes les âmes
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ames.map((ame) => (
              <div
                key={ame.nom}
                className="group relative flex flex-col p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#161412",
                  border: "1px solid rgba(245,240,235,0.08)",
                }}
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs tracking-widest" style={{ color: "rgba(245,240,235,0.3)" }}>
                    {ame.num}
                  </span>
                  <span
                    className="text-2xl"
                    style={{ fontFamily: "serif", color: ame.couleur, opacity: 0.6 }}
                  >
                    {ame.arabe}
                  </span>
                </div>
                <h3
                  className="text-3xl mb-2"
                  style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB", fontWeight: 400 }}
                >
                  {ame.nom}
                </h3>
                <p className="text-xs mb-6 tracking-wide" style={{ color: ame.couleur }}>
                  {ame.notes}
                </p>
                <p
                  className="text-sm italic leading-relaxed mt-auto"
                  style={{ fontFamily: "var(--font-serif)", color: "rgba(245,240,235,0.5)" }}
                >
                  "{ame.emotion}"
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: ame.couleur }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Les Coffrets */}
      <section className="py-24 bg-[#161412]">
        <div className="container-braise">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="section-label mb-4">Nos coffrets</p>
              <h2 className="heading-lg" style={{ color: "#F5F0EB" }}>
                Assemblés à la main,
                <br />
                <em style={{ color: "#C8A96E" }}>offerts avec intention.</em>
              </h2>
            </div>
            <Link href="/les-coffrets" className="btn-outline self-start md:self-auto">
              Voir tous les coffrets
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coffrets.map((c, i) => (
              <div
                key={c.nom}
                className="group flex flex-col justify-between p-8 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: i === 2 ? "rgba(200,169,110,0.06)" : "#0D0D0D",
                  border: `1px solid ${i === 2 ? "rgba(200,169,110,0.2)" : "rgba(245,240,235,0.08)"}`,
                }}
              >
                <div>
                  <p className="text-xs mb-6 tracking-widest uppercase" style={{ color: "rgba(245,240,235,0.35)" }}>
                    {c.occasion}
                  </p>
                  <h3
                    className="text-xl mb-3"
                    style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB", fontWeight: 400 }}
                  >
                    {c.nom}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.45)" }}>
                    {c.contenu}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                  <span className="text-sm font-medium" style={{ color: "#C8A96E" }}>
                    {c.prix}
                  </span>
                  <Link href="/les-coffrets" className="btn-outline text-[10px] py-2 px-5">
                    Personnaliser
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Braise */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container-braise">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-6">Notre conviction</p>
            <h2 className="heading-lg mb-8" style={{ color: "#F5F0EB" }}>
              Pourquoi confier votre cadeau à un expert ?
            </h2>
            <p className="text-base leading-loose mb-6" style={{ color: "rgba(245,240,235,0.55)" }}>
              Un cadeau générique se range dans un tiroir. Un coffret Braise
              parfume une pièce, raconte une intention, traverse le temps.
            </p>
            <p className="text-base leading-loose mb-12" style={{ color: "rgba(245,240,235,0.55)" }}>
              Dans la maison, la voiture, les vêtements — avoir un parfum
              unique vous rend présent même quand vous ne l'êtes pas. C'est ça,
              la différence entre un produit et une émotion.
            </p>
            <Link href="/notre-histoire" className="btn-or">
              Notre manifeste
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate teaser */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #161412 0%, #1a1210 100%)",
          borderTop: "1px solid rgba(245,240,235,0.06)",
        }}
      >
        <div className="container-braise flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="section-label mb-4">Cadeaux entreprise</p>
            <h2 className="heading-md mb-3" style={{ color: "#F5F0EB" }}>
              Votre marque mérite
              <br />
              un cadeau à sa hauteur.
            </h2>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(245,240,235,0.5)" }}>
              Coffrets personnalisés avec votre logo, commandes à partir de 20
              unités, livraison sur tout le Maroc.
            </p>
          </div>
          <Link href="/corporate" className="btn-or whitespace-nowrap shrink-0">
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
