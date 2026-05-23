import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Braise — Le feu qui ne s'éteint pas",
  description: "Braise crée des coffrets olfactifs premium assemblés à la main à Casablanca. Offrez une émotion, pas un objet.",
};

const M = { fontFamily: "var(--font-mono)" };

export default function Home() {
  return (
    <>
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", padding: "140px var(--pad-x) 80px", overflow: "hidden", isolation: "isolate" }}>
        {/* Backgrounds */}
        <div style={{ position: "absolute", inset: 0, zIndex: -2, background: "radial-gradient(60% 80% at 70% 50%, rgba(200,169,110,0.18) 0%, transparent 60%), radial-gradient(40% 60% at 20% 80%, rgba(184,92,56,0.10) 0%, transparent 60%), #0D0D0D" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(180deg, rgba(13,13,13,0) 60%, rgba(13,13,13,1) 100%)", pointerEvents: "none" }} />

        <div className="hero-grid-2col" style={{ maxWidth: "var(--container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "80px", alignItems: "center", minHeight: "calc(100vh - 220px)" }}>

          {/* ── Left: text ── */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "32px" }}>
              <span style={{ width: "32px", height: "1px", background: "#C8A96E", flexShrink: 0 }} />
              Studio de gifting olfactif · Casablanca
            </div>

            <h1 className="heading-xl" style={{ color: "#F5F0EB", margin: "0 0 36px" }}>
              Offre un souvenir<br />
              qui ne <em style={{ fontStyle: "italic", color: "#C8A96E" }}>s'efface</em><br />
              pas.
            </h1>

            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--muted)", maxWidth: "460px", margin: "0 0 48px", fontWeight: 300 }}>
              Coffrets olfactifs artisanaux, assemblés à la main à Casablanca.
              Trois âmes, cinq gestuelles, une intention — pour ceux qui savent que
              l'attention se sent avant de se voir.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <Link href="/les-coffrets" className="btn-or">
                Trouver le coffret parfait <span>→</span>
              </Link>
              <Link href="/les-ames" className="btn-ghost">
                Découvrir les âmes
              </Link>
            </div>

            {/* Trust bar */}
            <div style={{ display: "flex", gap: "36px", marginTop: "72px", paddingTop: "32px", borderTop: "1px solid var(--hairline)", maxWidth: "560px", flexWrap: "wrap" }}>
              {[
                { label: "Livraison", value: "J+1 Casablanca" },
                { label: "Paiement",  value: "À la livraison" },
                { label: "Atelier",   value: "Casablanca" },
              ].map((t) => (
                <div key={t.label}>
                  <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "6px" }}>{t.label}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "#F5F0EB" }}>{t.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: visual ── */}
          <div className="hero-visual-col" style={{ position: "relative", aspectRatio: "4/5", width: "100%" }}>
            <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 2, display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: "1px solid var(--hairline)", borderRadius: "999px", background: "rgba(13,13,13,0.6)", backdropFilter: "blur(8px)", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#F5F0EB" }}>
              <span className="animate-pulse-or" style={{ width: "6px", height: "6px", borderRadius: "999px", background: "#C8A96E", flexShrink: 0 }} />
              Édition 01 · Layl
            </div>
            <div className="ph-dark" style={{ width: "100%", height: "100%", borderRadius: "4px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80" alt="Coffret Layl" loading="lazy" />
            </div>
            <div style={{ position: "absolute", right: "-10px", bottom: "32px", writingMode: "vertical-rl", transform: "rotate(180deg)", ...M, fontSize: "10px", letterSpacing: "0.32em", color: "var(--muted-2)" }}>
              FOYER · FUMÉE · MÉMOIRE
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ MANIFESTO ══════════════════════════ */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", textAlign: "center", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "14px", color: "#C8A96E", letterSpacing: "0.08em", marginBottom: "56px" }}>— Manifeste</div>
          <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(32px,3.6vw,52px)", lineHeight: 1.25, maxWidth: "980px", margin: "0 auto 56px", color: "#F5F0EB" }}>
            Le parfum est le feu qui couve. Invisible, mais présent partout.<br />
            Il dit ce que la voix tait. Il reste quand on s'en va.<br />
            Braise, c'est la <em style={{ fontStyle: "italic", color: "#C8A96E" }}>chaleur qui demeure</em>.
          </p>
          <div style={{ ...M, fontSize: "11px", letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase" }}>Casablanca · Estd. 2026</div>
        </div>
      </section>

      {/* ══════════════════════════ ÂMES ══════════════════════════ */}
      <section style={{ background: "#161412", padding: "clamp(80px,12vh,160px) var(--pad-x)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

          {/* Header 2-col */}
          <div className="ames-home-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end", marginBottom: "80px" }}>
            <div>
              <div className="section-eyebrow">
                <span className="ey-num">01</span>
                Les trois âmes
                <span className="ey-line" />
              </div>
              <h2 className="heading-lg" style={{ color: "#F5F0EB", margin: 0 }}>
                Trois fragrances. Trois intentions. <em style={{ fontStyle: "italic", color: "#C8A96E" }}>Une signature.</em>
              </h2>
            </div>
            <div style={{ textAlign: "right", fontSize: "13px", color: "var(--muted)", maxWidth: "360px", marginLeft: "auto", lineHeight: 1.7 }}>
              Chaque âme est une composition exclusive — protégée, signée,
              impossible à retrouver ailleurs. Survole une carte pour découvrir
              ses notes.
            </div>
          </div>

          {/* 3 cards */}
          <div className="ames-home-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              {
                id: "layl",
                label1: "01 / Nuit", label2: "Profond",
                name: "Layl", roman: "Édition Nuit · N° 01",
                notes: ["Oud", "Ambre chaud", "Musc noir", "Cèdre"],
                emotion: "« Je veux que tu penses à moi même quand je suis parti. »",
                bg: "radial-gradient(80% 60% at 50% 100%, rgba(200,169,110,0.22) 0%, transparent 70%), linear-gradient(160deg, #1e1614 0%, #0a0808 100%)",
              },
              {
                id: "bahjat",
                label1: "02 / Matin", label2: "Lumineux",
                name: "Bahjat", roman: "Édition Matin · N° 02",
                notes: ["Fleur d'oranger", "Jasmin", "Musc blanc", "Bergamote"],
                emotion: "« Je t'offre la légèreté que tu mérites. »",
                bg: "radial-gradient(80% 60% at 50% 100%, rgba(232,213,163,0.20) 0%, transparent 70%), linear-gradient(160deg, #1a1a18 0%, #0d0d0c 100%)",
              },
              {
                id: "assel",
                label1: "03 / Soir", label2: "Enveloppant",
                name: "Assel", roman: "Édition Soir · N° 03",
                notes: ["Miel chaud", "Vanille", "Santal", "Fève tonka"],
                emotion: "« Je veux que tu te sentes chez toi, où que tu sois. »",
                bg: "radial-gradient(80% 60% at 50% 100%, rgba(184,92,56,0.20) 0%, transparent 70%), linear-gradient(160deg, #1f1612 0%, #0e0a08 100%)",
              },
            ].map((a) => (
              <article key={a.id} className="ame-card" style={{ aspectRatio: "3/4.2", background: a.bg }}>
                <div style={{ position: "absolute", inset: 0, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {/* Top labels */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", ...M, fontSize: "10px", letterSpacing: "0.24em", color: "var(--muted)", textTransform: "uppercase" }}>
                    <span>{a.label1}</span><span>{a.label2}</span>
                  </div>
                  {/* Name */}
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(72px,8vw,120px)", lineHeight: 1, color: "#F5F0EB", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                      {a.name}
                    </div>
                    <div style={{ ...M, fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C8A96E" }}>
                      {a.roman}
                    </div>
                  </div>
                  {/* Bottom: notes + emotion + cta */}
                  <div>
                    <div className="ame-notes">
                      {a.notes.map((n) => (
                        <span key={n} style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", padding: "5px 10px", border: "1px solid var(--hairline)", borderRadius: "999px" }}>{n}</span>
                      ))}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "18px", lineHeight: 1.5, color: "#F5F0EB", maxWidth: "280px", margin: "0 auto 24px" }}>
                        {a.emotion}
                      </p>
                      <Link href={`/les-coffrets?ame=${a.id}`} className="ame-cta">
                        Choisir {a.name} <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ COFFRETS (white) ══════════════════════════ */}
      <section style={{ background: "#F5F0EB", color: "#0D0D0D", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "40px", marginBottom: "80px", flexWrap: "wrap" }}>
            <div>
              <div className="section-eyebrow dark">
                <span className="ey-num">02</span>
                Les coffrets
                <span className="ey-line" />
              </div>
              <h2 className="heading-lg" style={{ color: "#0D0D0D", margin: 0 }}>
                Composés à la main. <em style={{ fontStyle: "italic", color: "#B85C38" }}>Choisis avec intention.</em>
              </h2>
            </div>
            <Link href="/les-coffrets" className="link-arrow" style={{ color: "#B85C38", borderBottomColor: "#B85C38" }}>
              Voir tous les coffrets <span>→</span>
            </Link>
          </div>

          {/* Asymmetric grid */}
          <div className="coffrets-home-grid">
            {/* Featured — spans 2 rows */}
            <article className="coffret-card coffret-card-dark coffrets-featured" style={{ background: "#0D0D0D", color: "#F5F0EB", border: "none" }}>
              <span style={{ position: "absolute", top: "24px", right: "24px", zIndex: 2, padding: "6px 12px", background: "#C8A96E", color: "#0D0D0D", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", borderRadius: "999px" }}>
                Le plus offert
              </span>
              <div style={{ aspectRatio: "4/3.6", position: "relative", width: "100%" }}>
                <div className="ph-dark" style={{ width: "100%", height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1602952706017-f3cc19eb98af?auto=format&fit=crop&w=1000&q=80" alt="Coffret signature" loading="lazy" />
                </div>
              </div>
              <div>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "var(--muted-2)", textTransform: "uppercase", marginBottom: "8px" }}>Coffret 03</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(22px,2.2vw,30px)", lineHeight: 1.2, margin: "0 0 12px", color: "#F5F0EB" }}>Pour marquer ce moment</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>Bouquet à bâtonnets · Bougie céramique · Recharge · Brûle-parfum · Coffret bois laqué · Message imprimé.</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "18px", borderTop: "1px solid var(--hairline)", marginTop: "16px" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "#F5F0EB" }}>
                    790–950 <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--muted-2)", marginLeft: "6px" }}>MAD</span>
                  </div>
                  <Link href="/les-coffrets" className="coffret-plus">→</Link>
                </div>
              </div>
            </article>

            {/* Card 01 */}
            <article className="coffret-card coffret-card-light" style={{ background: "#EFE8DF", border: "1px solid rgba(13,13,13,0.08)", color: "#0D0D0D" }}>
              <div style={{ aspectRatio: "5/4", position: "relative", width: "100%" }}>
                <div className="ph-light" style={{ width: "100%", height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1505855265981-d52719d1f64e?auto=format&fit=crop&w=1000&q=80" alt="Coffret cadeau" loading="lazy" />
                </div>
              </div>
              <div>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "rgba(13,13,13,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Coffret 01</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2vw,26px)", lineHeight: 1.2, margin: "0 0 12px" }}>Pour que tu penses à moi</h3>
                <p style={{ fontSize: "13px", color: "rgba(13,13,13,0.6)", lineHeight: 1.6 }}>Bouquet 150ml + Brume 100ml + carte manuscrite.</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "18px", borderTop: "1px solid rgba(13,13,13,0.1)", marginTop: "16px" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "20px" }}>
                    490–580 <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(13,13,13,0.5)", marginLeft: "6px" }}>MAD</span>
                  </div>
                  <Link href="/les-coffrets" className="coffret-plus">→</Link>
                </div>
              </div>
            </article>

            {/* Card 04 */}
            <article className="coffret-card coffret-card-light" style={{ background: "#EFE8DF", border: "1px solid rgba(13,13,13,0.08)", color: "#0D0D0D" }}>
              <span style={{ position: "absolute", top: "24px", right: "24px", zIndex: 2, padding: "6px 12px", background: "#B85C38", color: "#F5F0EB", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", borderRadius: "999px" }}>
                Exclusif
              </span>
              <div style={{ aspectRatio: "5/4", position: "relative", width: "100%" }}>
                <div className="ph-light" style={{ width: "100%", height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80" alt="Kit créateur" loading="lazy" />
                </div>
              </div>
              <div>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "rgba(13,13,13,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Coffret 04</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2vw,26px)", lineHeight: 1.2, margin: "0 0 12px" }}>Compose ton émotion toi-même</h3>
                <p style={{ fontSize: "13px", color: "rgba(13,13,13,0.6)", lineHeight: 1.6 }}>Flacon vide + 3 fragrances + bâtonnets + guide illustré.</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "18px", borderTop: "1px solid rgba(13,13,13,0.1)", marginTop: "16px" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "20px" }}>
                    420–520 <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(13,13,13,0.5)", marginLeft: "6px" }}>MAD</span>
                  </div>
                  <Link href="/les-coffrets" className="coffret-plus">→</Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ PROCESSUS ══════════════════════════ */}
      <section style={{ background: "#0D0D0D", borderTop: "1px solid var(--hairline)", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div style={{ maxWidth: "720px" }}>
            <div className="section-eyebrow">
              <span className="ey-num">03</span>
              Le processus
              <span className="ey-line" />
            </div>
            <h2 className="heading-lg" style={{ color: "#F5F0EB", margin: "0 0 24px" }}>
              Pas une chaîne. <em style={{ fontStyle: "italic", color: "#C8A96E" }}>Des mains.</em>
            </h2>
            <p style={{ fontSize: "17px", color: "var(--muted)", maxWidth: "600px", lineHeight: 1.7 }}>
              Nous sommes d'ici. Nos racines sont marocaines, notre langage est contemporain.
              Chaque coffret traverse trois ateliers avant d'atteindre celui ou celle à qui il est destiné.
            </p>
          </div>

          <div className="processus-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "80px", borderTop: "1px solid var(--hairline)" }}>
            {[
              {
                num: "— 01",
                title: "Fragrances exclusives",
                text: "Trois compositions signées et protégées contractuellement. Aucune ne se retrouve ailleurs. C'est notre signature olfactive.",
                svg: (
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M28 6c4 6 9 9 9 17a9 9 0 11-18 0c0-8 5-11 9-17z" />
                    <path d="M28 38c2 3 4 5 4 8a4 4 0 11-8 0c0-3 2-5 4-8z" />
                  </svg>
                ),
              },
              {
                num: "— 02",
                title: "Céramiques marocaines",
                text: "Pots à bougie tournés à Safi, brûle-parfum gravés à Fès. Des mains qu'on peut nommer, pas des usines anonymes.",
                svg: (
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="28" cy="14" rx="14" ry="5" />
                    <path d="M14 14v28c0 3 6 5 14 5s14-2 14-5V14" />
                    <path d="M20 22v18M28 22v18M36 22v18" />
                  </svg>
                ),
              },
              {
                num: "— 03",
                title: "Assemblage à Casablanca",
                text: "Chaque coffret est rubané, scellé et signé dans notre atelier. La carte manuscrite est, vraiment, manuscrite.",
                svg: (
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="10" y="20" width="36" height="26" rx="2" />
                    <path d="M10 28h36" />
                    <path d="M28 20v-6c0-3 3-6 6-6s6 3 6 6" />
                    <path d="M28 20v-6c0-3-3-6-6-6s-6 3-6 6" />
                  </svg>
                ),
              },
            ].map((p, i) => (
              <div key={i} style={{ padding: "56px 32px 56px 0", borderRight: i < 2 ? "1px solid var(--hairline)" : "none", paddingLeft: i > 0 ? "32px" : 0 }}>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", color: "#C8A96E", marginBottom: "28px" }}>{p.num}</div>
                <div style={{ marginBottom: "32px" }}>{p.svg}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400, margin: "0 0 14px", color: "#F5F0EB" }}>{p.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, maxWidth: "320px" }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ REVIEWS ══════════════════════════ */}
      <section style={{ background: "#161412", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

          <div className="reviews-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "80px", alignItems: "end", marginBottom: "64px" }}>
            <div>
              <div className="section-eyebrow">
                <span className="ey-num">04</span>
                Reçus avec émotion
                <span className="ey-line" />
              </div>
              <h2 className="heading-lg" style={{ color: "#F5F0EB", margin: 0 }}>
                Ce que <em style={{ fontStyle: "italic", color: "#C8A96E" }}>nos premiers</em> clients en disent.
              </h2>
            </div>
            <div style={{ display: "flex", gap: "48px", textAlign: "right" }}>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "48px", lineHeight: 1, color: "#C8A96E", marginBottom: "8px" }}>4.9<span style={{ fontSize: "24px", color: "var(--muted)" }}>/5</span></div>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted)" }}>Note moyenne</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "48px", lineHeight: 1, color: "#C8A96E", marginBottom: "8px" }}>+1 200</div>
                <div style={{ ...M, fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted)" }}>Coffrets offerts</div>
              </div>
            </div>
          </div>

          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { initial: "N", name: "Nadia M.", context: "Rabat · Mariage", text: "J'ai offert « Pour marquer ce moment » à un mariage à Rabat. La mariée a fondu en larmes. Braise, c'est une expérience." },
              { initial: "Y", name: "Younes B.", context: "Casablanca · Maison", text: "Layl a parfumé toute la maison pendant deux mois. Mes parents m'ont demandé d'où venait ce parfum à chaque visite. Le mien." },
              { initial: "S", name: "Sara K.", context: "Casablanca · Corporate", text: "On a commandé 80 coffrets corporate. Personnalisation parfaite, livraison à l'heure. Nos clients VIP s'en souviennent encore." },
            ].map((r) => (
              <article key={r.name} className="review-card">
                <div style={{ color: "#C8A96E", letterSpacing: "4px", fontSize: "14px" }}>★★★★★</div>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "19px", lineHeight: 1.55, color: "#F5F0EB", margin: 0, flex: 1 }}>{r.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "24px", borderTop: "1px solid var(--hairline)" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "999px", background: "linear-gradient(135deg, #2a221a, #3d2e1f)", border: "1px solid var(--hairline)", display: "grid", placeItems: "center", fontFamily: "var(--font-serif)", fontSize: "16px", color: "#C8A96E", flexShrink: 0 }}>
                    {r.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", color: "#F5F0EB", marginBottom: "2px" }}>{r.name}</div>
                    <div style={{ ...M, fontSize: "11px", letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>{r.context}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ INSTAGRAM ══════════════════════════ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(80px,12vh,160px) var(--pad-x)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>
              <span className="ey-line" />
              <span className="ey-num">05</span>
              Le studio en images
              <span className="ey-line" />
            </div>
            <h2 className="heading-lg" style={{ color: "#F5F0EB", margin: "0 0 16px" }}>Suis le geste, l'odeur, la lumière.</h2>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "14px", color: "#C8A96E", letterSpacing: "0.04em" }}>@braise.studio</div>
          </div>

          <div className="ig-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
            {[
              { url: "https://images.unsplash.com/photo-1643716991720-0318b9f55dcc?auto=format&fit=crop&w=600&q=80", dark: true },
              { url: "https://images.unsplash.com/photo-1778784544843-712029254a98?auto=format&fit=crop&w=600&q=80", dark: true },
              { url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80", dark: false },
              { url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80", dark: true },
              { url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80", dark: false },
              { url: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=600&q=80", dark: true },
            ].map((tile, i) => (
              <div key={i} className="ig-tile">
                <div className={tile.dark ? "ph-dark" : "ph-light"} style={{ width: "100%", height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tile.url} alt="" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ NEWSLETTER (white) ══════════════════════════ */}
      <section style={{ background: "#F5F0EB", color: "#0D0D0D", padding: "clamp(80px,12vh,160px) var(--pad-x)", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-eyebrow dark" style={{ justifyContent: "center" }}>
            <span className="ey-line" />
            <span className="ey-num">06</span>
            La lettre du foyer
            <span className="ey-line" />
          </div>
          <h2 className="heading-lg" style={{ color: "#0D0D0D", margin: "0 0 24px" }}>
            Reçois <em style={{ fontStyle: "italic", color: "#B85C38" }}>les nouvelles collections</em><br />avant tout le monde.
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(13,13,13,0.65)", maxWidth: "600px", lineHeight: 1.7, margin: "0 auto" }}>
            Une lettre lente, six fois par an. Les coffrets de saison, les histoires d'atelier, les offres réservées.
          </p>
          <NewsletterForm />
          <div style={{ marginTop: "24px", fontSize: "11px", color: "rgba(13,13,13,0.5)", letterSpacing: "0.04em" }}>
            Tu pourras te désinscrire à tout moment. Aucun spam, promis.
          </div>
        </div>
      </section>
    </>
  );
}
