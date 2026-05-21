import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Âmes Olfactives",
  description:
    "Trois fragrances exclusives Braise : Layl, Bahjat, Assel. Choisissez votre intention olfactive.",
};

const ames = [
  {
    num: "01",
    nom: "Layl",
    arabe: "لَيْل",
    signification: "La nuit",
    notes: ["Oud", "Ambre chaud", "Musc noir", "Cèdre"],
    emotion: "Je veux que tu penses à moi même quand je suis parti.",
    description:
      "Layl est la fragrance de la présence invisible. Profond, enveloppant, il s'installe dans une pièce comme un souvenir. Pour ceux qui veulent laisser une trace.",
    couleur: "#B85C38",
    usage: ["Salon", "Bureau", "Chambre", "Cadeau homme"],
  },
  {
    num: "02",
    nom: "Bahjat",
    arabe: "بَهْجَة",
    signification: "La joie",
    notes: ["Fleur d'oranger", "Jasmin", "Musc blanc", "Bergamote"],
    emotion: "Je t'offre la légèreté que tu mérites.",
    description:
      "Bahjat est une lumière douce dans une pièce sombre. Floral sans être sucré, frais sans être froid. Pour les moments où l'on veut respirer.",
    couleur: "#C8A96E",
    usage: ["Chambre", "Salle de bain", "Cadeau femme", "Printemps-été"],
  },
  {
    num: "03",
    nom: "Assel",
    arabe: "عَسَل",
    signification: "Le miel",
    notes: ["Miel chaud", "Vanille", "Santal", "Fève tonka"],
    emotion: "Je veux que tu te sentes chez toi, où que tu sois.",
    description:
      "Assel est la chaleur du foyer. Doux, rassurant, enveloppant. Il transforme n'importe quel espace en refuge. Pour ceux qui rentrent à la maison.",
    couleur: "#8B7355",
    usage: ["Salon", "Couloir", "Voiture", "Hiver"],
  },
];

export default function LesAmes() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-[#0D0D0D]" style={{ borderBottom: "1px solid rgba(245,240,235,0.06)" }}>
        <div className="container-braise">
          <p className="section-label mb-6">Fragrances exclusives</p>
          <h1 className="heading-xl max-w-2xl mb-6" style={{ color: "#F5F0EB" }}>
            Les Âmes Olfactives
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(245,240,235,0.55)" }}>
            Trois compositions exclusives. Pas des parfums — des intentions.
            Choisissez l'âme qui correspond à ce que vous voulez transmettre.
          </p>
        </div>
      </section>

      {/* Les 3 âmes */}
      {ames.map((ame, i) => (
        <section
          key={ame.nom}
          className="py-20"
          style={{ background: i % 2 === 0 ? "#161412" : "#0D0D0D" }}
        >
          <div className="container-braise">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Visual side */}
              <div
                className={`flex flex-col justify-center items-center aspect-square max-w-sm mx-auto w-full ${i % 2 !== 0 ? "md:order-2" : ""}`}
                style={{
                  background: `radial-gradient(ellipse at center, ${ame.couleur}20 0%, transparent 70%)`,
                  border: `1px solid ${ame.couleur}30`,
                }}
              >
                <span
                  className="text-8xl mb-4"
                  style={{ fontFamily: "serif", color: ame.couleur, opacity: 0.7 }}
                >
                  {ame.arabe}
                </span>
                <span
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{ color: "rgba(245,240,235,0.3)" }}
                >
                  {ame.signification}
                </span>
              </div>

              {/* Content side */}
              <div className={i % 2 !== 0 ? "md:order-1" : ""}>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-xs tracking-widest" style={{ color: "rgba(245,240,235,0.3)" }}>
                    {ame.num}
                  </span>
                  <h2
                    className="text-5xl"
                    style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB", fontWeight: 400 }}
                  >
                    {ame.nom}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {ame.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 text-xs tracking-wide"
                      style={{
                        background: `${ame.couleur}15`,
                        border: `1px solid ${ame.couleur}30`,
                        color: ame.couleur,
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(245,240,235,0.55)" }}>
                  {ame.description}
                </p>

                <p
                  className="text-base italic mb-8"
                  style={{ fontFamily: "var(--font-serif)", color: "rgba(245,240,235,0.6)" }}
                >
                  "{ame.emotion}"
                </p>

                <div className="mb-8">
                  <p className="text-xs mb-3 tracking-widest uppercase" style={{ color: "rgba(245,240,235,0.3)" }}>
                    Idéal pour
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ame.usage.map((u) => (
                      <span
                        key={u}
                        className="text-xs px-3 py-1"
                        style={{ border: "1px solid rgba(245,240,235,0.12)", color: "rgba(245,240,235,0.5)" }}
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/les-coffrets" className="btn-or">
                  Choisir {ame.nom}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-[#161412] text-center">
        <div className="container-braise">
          <p className="section-label mb-4">Prêt à offrir ?</p>
          <h2 className="heading-md mb-8" style={{ color: "#F5F0EB" }}>
            Composez votre coffret maintenant
          </h2>
          <Link href="/les-coffrets" className="btn-or">
            Voir les coffrets
          </Link>
        </div>
      </section>
    </>
  );
}
