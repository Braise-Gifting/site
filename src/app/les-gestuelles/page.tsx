import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Gestuelles",
  description:
    "5 formats de diffusion Braise : bouquet, bougie, brume, brûle-parfum, recharge. Disponibles en 3 âmes olfactives.",
};

const gestuelles = [
  {
    num: "01",
    nom: "Le Témoin Silencieux",
    format: "Bouquet à bâtonnets — Présence",
    prix: "259 – 320 MAD",
    diffusion: "6 – 8 semaines",
    volume: "150ml",
    ames: ["Layl", "Bahjat", "Assel"],
    emotion: "Il parfume l'air et raconte à tes invités qui tu es.",
    description:
      "Le bouquet qui reste. Posé sur un meuble, il diffuse en silence pendant deux mois. Flacon verre soufflé, bâtonnets rotin naturel, étiquette calligraphiée.",
  },
  {
    num: "02",
    nom: "Le Rituel du Feu",
    format: "Bougie en pot artisanale — Moment",
    prix: "199 – 250 MAD",
    diffusion: "~40 heures",
    volume: "180g",
    ames: ["Layl", "Bahjat", "Assel"],
    emotion: "Je veux que ce soir soit différent des autres soirs.",
    description:
      "Cire végétale soja, pot céramique artisan marocain (Safi ou Fès), mèche coton. Assemblée à la main. Pour les soirs qui méritent d'être différents.",
  },
  {
    num: "03",
    nom: "Le Geste Rapide",
    format: "Brume d'ambiance — Instant",
    prix: "149 – 179 MAD",
    diffusion: "Instantané",
    volume: "100ml",
    ames: ["Layl", "Bahjat", "Assel"],
    emotion: "Je veux changer l'air en quelques secondes.",
    description:
      "Spray 100ml, flacon mat givré, bouchon bois. Tissus, oreiller, voiture, pièces — partout, en deux secondes. La gestuelle la plus versatile.",
  },
  {
    num: "04",
    nom: "L'Objet de Maison",
    format: "Brûle-parfum céramique — Chaleur",
    prix: "229 – 310 MAD",
    diffusion: "Selon pastilles",
    volume: "+ 3 pastilles",
    ames: ["Layl", "Assel"],
    emotion: "Je veux un objet beau qui fait partie de mon intérieur.",
    description:
      "Céramique artisanale marocaine (blanc cassé ou terre cuite), vendu avec 3 pastilles de cire parfumée. Une pièce décorative qui diffuse en chauffant.",
  },
  {
    num: "05",
    nom: "La Recharge",
    format: "Recharge liquide concentrée — Fidélité",
    prix: "139 – 169 MAD",
    diffusion: "Identique à l'original",
    volume: "200ml",
    ames: ["Layl", "Bahjat", "Assel"],
    emotion: "Je veux retrouver exactement ce que j'avais avant.",
    description:
      "La même fragrance, le même accord — pour recharger votre bouquet sans changer ce qui fonctionne. La gestuelle qui transforme un acheteur en client fidèle.",
  },
];

export default function LesGestuelles() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-[#0D0D0D]" style={{ borderBottom: "1px solid rgba(245,240,235,0.06)" }}>
        <div className="container-braise">
          <p className="section-label mb-6">5 formats de diffusion</p>
          <h1 className="heading-xl max-w-2xl mb-6" style={{ color: "#F5F0EB" }}>
            Les Gestuelles
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(245,240,235,0.55)" }}>
            Chaque espace mérite sa gestuelle. Chaque moment, son format. Cinq
            façons de diffuser une âme olfactive — toutes disponibles dans les
            trois fragrances Braise.
          </p>
        </div>
      </section>

      {/* Gestuelles list */}
      <section className="py-8 bg-[#161412]">
        <div className="container-braise">
          {gestuelles.map((g, i) => (
            <div
              key={g.num}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
              style={{
                borderBottom: i < gestuelles.length - 1 ? "1px solid rgba(245,240,235,0.06)" : "none",
              }}
            >
              {/* Number + title */}
              <div className="flex flex-col justify-start">
                <span className="text-xs tracking-widest mb-2" style={{ color: "rgba(245,240,235,0.3)" }}>
                  Gestuelle {g.num}
                </span>
                <h2
                  className="text-2xl mb-2"
                  style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB", fontWeight: 400 }}
                >
                  {g.nom}
                </h2>
                <p className="text-xs tracking-wide" style={{ color: "#C8A96E" }}>
                  {g.format}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(245,240,235,0.5)" }}>
                  {g.description}
                </p>
                <p
                  className="text-sm italic"
                  style={{ fontFamily: "var(--font-serif)", color: "rgba(245,240,235,0.4)" }}
                >
                  "{g.emotion}"
                </p>
              </div>

              {/* Specs + CTA */}
              <div className="flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    ["Volume", g.volume],
                    ["Diffusion", g.diffusion],
                    ["Prix", g.prix],
                    ["Âmes", g.ames.join(" · ")],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "rgba(245,240,235,0.25)" }}>
                        {label}
                      </p>
                      <p className="text-sm" style={{ color: "rgba(245,240,235,0.65)" }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <Link href="/les-coffrets" className="btn-outline self-start text-[10px]">
                  L'inclure dans un coffret
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0D0D0D] text-center">
        <div className="container-braise">
          <h2 className="heading-md mb-6" style={{ color: "#F5F0EB" }}>
            Composez votre coffret sur mesure
          </h2>
          <p className="text-sm mb-10" style={{ color: "rgba(245,240,235,0.45)" }}>
            Combinez plusieurs gestuelles dans un seul coffret — sur WhatsApp, c'est simple.
          </p>
          <a
            href="https://wa.me/212600000000?text=Bonjour%20Braise%2C%20je%20voudrais%20composer%20un%20coffret%20sur%20mesure."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-or"
          >
            Composer mon coffret
          </a>
        </div>
      </section>
    </>
  );
}
