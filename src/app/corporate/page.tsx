import type { Metadata } from "next";
import CorporateForm from "./CorporateForm";

export const metadata: Metadata = {
  title: "Cadeaux Corporate",
  description:
    "Coffrets olfactifs personnalisés pour entreprises. Logo, message, packaging sur mesure. À partir de 20 unités. Devis gratuit.",
};

const avantages = [
  { titre: "Packaging à votre image", texte: "Logo entreprise, couleurs de marque, message personnalisé — chaque coffret devient un ambassadeur de votre identité." },
  { titre: "À partir de 20 unités", texte: "Commandes groupées avec tarifs dégressifs. Prix dédiés aux entreprises pour tout volume." },
  { titre: "Livraison sur tout le Maroc", texte: "Casablanca, Rabat, Marrakech et tout le territoire. Livraison coordonnée pour vos événements." },
  { titre: "Délais garantis", texte: "Assemblage à la demande avec planning de production confirmé. Vos cadeaux arrivent à temps." },
];

const occasions = [
  "Cadeaux de fin d'année", "Onboarding collaborateurs", "Cadeaux clients VIP",
  "Événements corporate", "Séminaires et conférences", "Inauguration de locaux",
  "Fêtes nationales (Aïd)", "Anniversaire d'entreprise",
];

export default function Corporate() {
  return (
    <>
      <section className="py-28 bg-[#0D0D0D]">
        <div className="container-braise">
          <p className="section-label mb-6">B2B · Entreprises</p>
          <h1 className="heading-xl max-w-2xl mb-6" style={{ color: "#F5F0EB" }}>
            Votre marque mérite
            <br />
            <em style={{ color: "#C8A96E" }}>un cadeau à sa hauteur.</em>
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(245,240,235,0.55)" }}>
            Coffrets olfactifs premium personnalisés à l'image de votre entreprise.
            Pour vos collaborateurs, vos clients, vos événements. Un cadeau qu'on n'oublie pas.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#161412]" style={{ borderTop: "1px solid rgba(245,240,235,0.06)" }}>
        <div className="container-braise">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((a) => (
              <div key={a.titre} className="flex flex-col gap-3">
                <div className="w-8 h-px bg-[#C8A96E]" />
                <h3 className="text-sm font-medium" style={{ color: "#F5F0EB" }}>{a.titre}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.45)" }}>{a.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <div className="container-braise">
          <p className="section-label mb-10">Pour quelles occasions ?</p>
          <div className="flex flex-wrap gap-3">
            {occasions.map((o) => (
              <span key={o} className="px-5 py-2.5 text-sm" style={{ border: "1px solid rgba(245,240,235,0.12)", color: "rgba(245,240,235,0.55)" }}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#161412]" id="devis">
        <div className="container-braise max-w-2xl mx-auto">
          <p className="section-label mb-4">Devis gratuit</p>
          <h2 className="heading-md mb-10" style={{ color: "#F5F0EB" }}>Parlons de votre projet</h2>
          <CorporateForm />
        </div>
      </section>
    </>
  );
}
