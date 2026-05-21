import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#161412]" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
      <div className="container-braise py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "0.08em", color: "#F5F0EB" }}>
                BRAISE
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(245,240,235,0.5)" }}>
              Studio de gifting olfactif premium.<br />
              Assemblé à la main à Casablanca, Maroc.
            </p>
            <p className="mt-6 text-xs italic" style={{ fontFamily: "var(--font-serif)", color: "#C8A96E" }}>
              "Le feu qui ne s'éteint pas."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label mb-5">Navigation</p>
            <nav className="flex flex-col gap-3">
              {[
                ["Les Âmes", "/les-ames"],
                ["Les Gestuelles", "/les-gestuelles"],
                ["Les Coffrets", "/les-coffrets"],
                ["Notre Histoire", "/notre-histoire"],
                ["Corporate", "/corporate"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors hover:text-[#C8A96E]"
                  style={{ color: "rgba(245,240,235,0.5)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label mb-5">Contact</p>
            <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(245,240,235,0.5)" }}>
              <p>Casablanca, Almaz<br />Maroc</p>
              <a
                href="https://wa.me/212600000000"
                className="transition-colors hover:text-[#C8A96E]"
              >
                WhatsApp Business
              </a>
              <a
                href="mailto:contact@braise.ma"
                className="transition-colors hover:text-[#C8A96E]"
              >
                contact@braise.ma
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/braise.ma" aria-label="Instagram" className="transition-opacity hover:opacity-70">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "rgba(245,240,235,0.5)" }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(245,240,235,0.3)" }}>
            © {new Date().getFullYear()} Braise. Tous droits réservés.
          </p>
          <p className="text-xs" style={{ color: "rgba(245,240,235,0.3)" }}>
            Casablanca · Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
