import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0D0D0D", borderTop: "1px solid var(--hairline)", padding: "80px var(--pad-x) 32px" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

        {/* 4-column grid */}
        <div className="footer-grid-4col" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "64px", paddingBottom: "64px", borderBottom: "1px solid var(--hairline)" }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "32px", letterSpacing: "0.18em", color: "#F5F0EB", marginBottom: "16px" }}>
              BRAISE
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C8A96E", marginBottom: "32px", fontSize: "16px" }}>
              Le feu qui ne s'éteint pas.
            </div>
            <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, maxWidth: "280px" }}>
              Studio &amp; atelier<br />
              Casablanca · Almaz<br />
              +212 6 00 00 00 00<br />
              bonjour@braise.ma
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#C8A96E", margin: "0 0 24px" }}>
              Catalogue
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                ["Les Âmes",       "/les-ames"],
                ["Les Gestuelles", "/les-gestuelles"],
                ["Les Coffrets",   "/les-coffrets"],
                ["Configurateur",  "/les-coffrets#configurateur"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maison */}
          <div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#C8A96E", margin: "0 0 24px" }}>
              Maison
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                ["Notre histoire",       "/notre-histoire"],
                ["Corporate",           "/corporate"],
                ["Boutique Casablanca", "/contact"],
                ["Presse",              "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", color: "#C8A96E", margin: "0 0 24px" }}>
              Service
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                ["Livraison & retours",  "/contact"],
                ["FAQ",                  "/contact#faq"],
                ["Contact",              "/contact"],
                ["CGV · Confidentialité","/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", letterSpacing: "0.16em", color: "var(--muted-2)", textTransform: "uppercase", flexWrap: "wrap", gap: "16px" }}>
          <div>© 2026 Braise Studio · Casablanca, Maroc</div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {["COD", "CMI", "Virement", "Stripe"].map((p) => (
              <span key={p} style={{ padding: "4px 10px", border: "1px solid var(--hairline)", borderRadius: "4px", fontSize: "10px" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
