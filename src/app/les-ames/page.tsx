import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Âmes Olfactives",
  description: "Découvrez les 3 fragrances exclusives de Braise : Layl (oud, ambre), Bahjat (fleur d'oranger, jasmin), Assel (miel, vanille). Choisissez votre âme.",
};

const M = { fontFamily: "var(--font-mono)" };

const ames = [
  {
    id: "layl",
    num: "01",
    name: "Layl",
    subtitle: "Édition Nuit",
    mood: { moment: "Nuit", intensite: "Profond" },
    emotion: "« Je veux que tu penses à moi même quand je suis parti. »",
    bg: "linear-gradient(180deg, #0f0a08 0%, #0D0D0D 100%)",
    notes: [
      { pos: "Tête",  note: "Oud",         desc: "Oriental, boisé, profond" },
      { pos: "Cœur",  note: "Ambre chaud", desc: "Résineux, enveloppant" },
      { pos: "Fond",  note: "Musc noir",   desc: "Sensuel, persistant" },
      { pos: "Fond",  note: "Cèdre",       desc: "Boisé, masculin" },
    ],
    imgUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80",
    reverse: false,
  },
  {
    id: "bahjat",
    num: "02",
    name: "Bahjat",
    subtitle: "Édition Matin",
    mood: { moment: "Matin", intensite: "Lumineux" },
    emotion: "« Je t'offre la légèreté que tu mérites. »",
    bg: "linear-gradient(180deg, #15140f 0%, #0D0D0D 100%)",
    notes: [
      { pos: "Tête",  note: "Fleur d'oranger", desc: "Frais, floral, solaire" },
      { pos: "Cœur",  note: "Jasmin",          desc: "Délicat, poudré" },
      { pos: "Cœur",  note: "Musc blanc",      desc: "Propre, aérien" },
      { pos: "Fond",  note: "Bergamote",        desc: "Citrus, vivifiant" },
    ],
    imgUrl: "https://images.unsplash.com/photo-1505855265981-d52719d1f64e?auto=format&fit=crop&w=1000&q=80",
    reverse: true,
  },
  {
    id: "assel",
    num: "03",
    name: "Assel",
    subtitle: "Édition Soir",
    mood: { moment: "Soir", intensite: "Enveloppant" },
    emotion: "« Je veux que tu te sentes chez toi, où que tu sois. »",
    bg: "linear-gradient(180deg, #170d08 0%, #0D0D0D 100%)",
    notes: [
      { pos: "Tête",  note: "Miel chaud", desc: "Doux, gourmand" },
      { pos: "Cœur",  note: "Vanille",    desc: "Chaud, réconfortant" },
      { pos: "Fond",  note: "Santal",     desc: "Crémeux, boisé" },
      { pos: "Fond",  note: "Fève tonka", desc: "Sucré, ambré" },
    ],
    imgUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80",
    reverse: false,
  },
];

export default function LesAmes() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: "#0D0D0D", padding: "140px var(--pad-x) 0" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow">
            <span className="ey-num">—</span>
            Les âmes olfactives
            <span className="ey-line" />
          </div>
          <h1 className="heading-xl" style={{ color: "#F5F0EB", margin: "0 0 32px", maxWidth: "820px" }}>
            Trois fragrances.<br />
            Trois intentions.<br />
            <em style={{ fontStyle: "italic", color: "#C8A96E" }}>Une signature.</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, fontWeight: 300 }}>
            Chaque âme est une composition exclusive — protégée, signée, impossible à retrouver ailleurs.
            Elle porte une émotion, un moment, une intention.
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ background: "#0D0D0D", padding: "0 var(--pad-x) 120px" }}>
        <div className="ames-intro-grid" style={{ maxWidth: "var(--container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "96px", paddingTop: "80px", borderTop: "1px solid var(--hairline)", alignItems: "start" }}>
          <div style={{ ...M, fontSize: "11px", letterSpacing: "0.32em", color: "#C8A96E", textTransform: "uppercase" }}>
            Notre approche
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "28px", lineHeight: 1.45, color: "#F5F0EB", margin: 0, maxWidth: "720px" }}>
            Le parfum est un langage. Chaque âme de Braise est une phrase complète —
            avec sa propre <em style={{ fontStyle: "italic", color: "#C8A96E" }}>grammaire émotionnelle</em>.
          </p>
        </div>
      </section>

      {/* ── Âme blocks (alternating) ── */}
      {ames.map((a) => (
        <section key={a.id} className="ame-block-section" style={{ background: a.bg, borderTop: "1px solid var(--hairline)", padding: "0 var(--pad-x)" }}>
          <div className="ame-block-grid" style={{
            maxWidth: "var(--container)",
            margin: "0 auto",
            padding: "120px 0",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "96px",
            alignItems: "center",
            direction: a.reverse ? "rtl" : "ltr",
          }}>
            {/* Info */}
            <div style={{ direction: "ltr" }}>
              <div style={{ ...M, fontSize: "11px", letterSpacing: "0.32em", color: "#C8A96E", textTransform: "uppercase", marginBottom: "32px" }}>
                {a.num} · {a.subtitle}
              </div>

              <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(64px,10vw,160px)", lineHeight: 0.9, color: "#F5F0EB", letterSpacing: "-0.03em", margin: "0 0 48px" }}>
                {a.name}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "48px", maxWidth: "480px" }}>
                {[
                  { label: "Moment",    val: a.mood.moment },
                  { label: "Intensité", val: a.mood.intensite },
                ].map((m) => (
                  <div key={m.label}>
                    <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "var(--muted-2)", textTransform: "uppercase", marginBottom: "6px" }}>{m.label}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "19px", color: "#F5F0EB" }}>{m.val}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "22px", lineHeight: 1.5, color: "#F5F0EB", maxWidth: "480px", margin: "0 0 40px", paddingLeft: "20px", borderLeft: "2px solid #C8A96E" }}>
                {a.emotion}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 48px", display: "flex", flexDirection: "column", maxWidth: "480px" }}>
                {a.notes.map((n) => (
                  <li key={n.note} className="note-row" style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "24px", padding: "14px 0", borderBottom: "1px solid var(--hairline)", alignItems: "baseline" }}>
                    <span style={{ ...M, fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-2)", textTransform: "uppercase" }}>{n.pos}</span>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "#F5F0EB" }}>{n.note}</span>
                    <span className="note-desc" style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.04em" }}>{n.desc}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
                <Link href={`/les-coffrets?ame=${a.id}`} className="btn-or">Choisir {a.name} →</Link>
                <Link href="/les-coffrets" className="btn-ghost">Voir les coffrets</Link>
              </div>
            </div>

            {/* Visual */}
            <div style={{ direction: "ltr", aspectRatio: "4/5", position: "relative" }}>
              <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 2, padding: "10px 14px", border: "1px solid var(--hairline)", borderRadius: "999px", background: "rgba(13,13,13,0.6)", backdropFilter: "blur(8px)", ...M, fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#C8A96E" }}>
                {a.num} · {a.name}
              </div>
              <div className="ph-dark" style={{ width: "100%", height: "100%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.imgUrl} alt={`Âme ${a.name}`} loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Comparison table ── */}
      <section style={{ background: "#161412", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow"><span className="ey-num">—</span> Comparaison <span className="ey-line" /></div>
          <h2 className="heading-lg" style={{ color: "#F5F0EB", margin: "0 0 64px" }}>Quelle âme est faite pour toi ?</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
              <thead>
                <tr>
                  {["", "Layl", "Bahjat", "Assel"].map((h) => (
                    <th key={h} style={{ padding: "22px 24px", textAlign: "left", borderBottom: "1px solid var(--hairline)", ...M, fontSize: "11px", letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase", fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Intensité",  vals: ["Profond",    "Léger",      "Enveloppant"] },
                  { label: "Moment",     vals: ["Nuit",       "Matin",      "Soir"] },
                  { label: "Famille",    vals: ["Oriental",   "Floral",     "Gourmand"] },
                  { label: "Humeur",     vals: ["Présence",   "Légèreté",   "Réconfort"] },
                  { label: "Pour qui",   vals: ["L'intensif", "Le solaire", "Le sensible"] },
                ].map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: "22px 24px", borderBottom: "1px solid var(--hairline)", ...M, fontSize: "11px", letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }}>{row.label}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} style={{ padding: "22px 24px", borderBottom: "1px solid var(--hairline)", fontFamily: "var(--font-serif)", fontSize: "18px", color: "#F5F0EB" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#0D0D0D", textAlign: "center", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <h2 className="heading-md" style={{ color: "#F5F0EB", margin: "0 0 32px" }}>Ton âme est choisie ?</h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", margin: "0 0 48px", lineHeight: 1.7 }}>
            Explore les coffrets pour combiner ton âme avec la gestuelle parfaite.
          </p>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/les-coffrets" className="btn-or">Voir les coffrets →</Link>
            <Link href="/les-gestuelles" className="btn-ghost">Choisir une gestuelle</Link>
          </div>
        </div>
      </section>
    </>
  );
}
