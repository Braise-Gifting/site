"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLeft = [
  { label: "Les Âmes",      href: "/les-ames" },
  { label: "Les Gestuelles", href: "/les-gestuelles" },
  { label: "Les Coffrets",  href: "/les-coffrets" },
  { label: "Notre histoire", href: "/notre-histoire" },
];

const navRight = [
  { label: "Corporate", href: "/corporate" },
  { label: "Contact",   href: "/contact" },
];

const marqueeItems = [
  "Livraison J+1 à Casablanca",
  "Paiement à la livraison disponible",
  "Packaging premium offert",
  "Personnalisation incluse",
  "Assemblé à la main à Casablanca",
  "Fragrances exclusives",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Utility bar (in normal flow — scrolls away) ── */}
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid var(--hairline)", color: "var(--muted)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="animate-marquee" style={{ display: "inline-block", padding: "12px 0" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ margin: "0 36px" }}>
              {item}
              <span style={{ color: "#C8A96E", margin: "0 8px" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Fixed header ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          paddingInline: "var(--pad-x)",
          transition: "background 600ms ease, border-color 600ms ease",
          background: scrolled ? "rgba(13,13,13,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", height: "88px" }}>

          {/* nav-left (desktop) */}
          <nav style={{ display: "flex", alignItems: "center", gap: "36px" }} className="hide-mobile">
            {navLeft.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
            ))}
          </nav>

          {/* Logo — centre */}
          <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", lineHeight: 1, textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "28px", letterSpacing: "0.18em", color: "#F5F0EB" }}>
              BRAISE
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>
              Casablanca
            </span>
          </Link>

          {/* nav-right (desktop) */}
          <div style={{ display: "flex", alignItems: "center", gap: "36px", justifyContent: "flex-end" }} className="hide-mobile">
            {navRight.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
            ))}
            <Link href="/les-coffrets" className="cart-pill">
              Commander <span className="count">→</span>
            </Link>
          </div>

          {/* Burger (mobile) */}
          <div style={{ display: "flex", justifyContent: "flex-end" }} className="show-mobile">
            <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "8px" }}>
              <span style={{ display: "block", width: "20px", height: "1px", background: "#F5F0EB", transition: "all 300ms", transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ display: "block", width: "20px", height: "1px", background: "#F5F0EB", transition: "all 300ms", opacity: open ? 0 : 1 }} />
              <span style={{ display: "block", width: "20px", height: "1px", background: "#F5F0EB", transition: "all 300ms", transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background: "#161412", borderTop: "1px solid var(--hairline)", padding: "24px var(--pad-x) 32px" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[...navLeft, ...navRight].map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,235,0.75)" }}>
                  {l.label}
                </Link>
              ))}
              <Link href="/les-coffrets" onClick={() => setOpen(false)} className="btn-or" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
                Commander
              </Link>
            </nav>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hide-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
