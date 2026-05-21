"use client";

export default function CorporateForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = [
      "Bonjour Braise Corporate,",
      `Nom : ${data.get("nom")}`,
      `Entreprise : ${data.get("entreprise")}`,
      `Quantité : ${data.get("quantite")}`,
      `Occasion : ${data.get("occasion")}`,
      `Budget : ${data.get("budget")}`,
    ].join("%0A");
    window.open(`https://wa.me/212600000000?text=${msg}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { name: "nom", label: "Nom complet", placeholder: "Votre nom" },
          { name: "entreprise", label: "Entreprise", placeholder: "Nom de l'entreprise" },
        ].map((f) => (
          <div key={f.name} className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase" style={{ color: "rgba(245,240,235,0.4)" }}>
              {f.label}
            </label>
            <input
              name={f.name}
              placeholder={f.placeholder}
              className="px-4 py-3 text-sm bg-transparent outline-none"
              style={{ border: "1px solid rgba(245,240,235,0.15)", color: "#F5F0EB" }}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { name: "quantite", label: "Nombre d'unités", placeholder: "Ex : 50" },
          { name: "occasion", label: "Occasion", placeholder: "Ex : Fin d'année" },
          { name: "budget", label: "Budget unitaire", placeholder: "Ex : 500 MAD" },
        ].map((f) => (
          <div key={f.name} className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase" style={{ color: "rgba(245,240,235,0.4)" }}>
              {f.label}
            </label>
            <input
              name={f.name}
              placeholder={f.placeholder}
              className="px-4 py-3 text-sm bg-transparent outline-none"
              style={{ border: "1px solid rgba(245,240,235,0.15)", color: "#F5F0EB" }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <button type="submit" className="btn-or">
          Envoyer via WhatsApp
        </button>
        <a href="mailto:corporate@braise.ma" className="btn-outline">
          Envoyer par email
        </a>
      </div>
    </form>
  );
}
