"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Les Âmes", href: "/les-ames" },
  { label: "Les Gestuelles", href: "/les-gestuelles" },
  { label: "Les Coffrets", href: "/les-coffrets" },
  { label: "Notre Histoire", href: "/notre-histoire" },
  { label: "Corporate", href: "/corporate" },
  { label: "Contact", href: "/contact" },
];

const marqueeItems = [
  "Assemblé à la main à Casablanca",
  "Livraison J+1 Casablanca · J+3 Maroc",
  "Coffrets personnalisés sur mesure",
  "Cadeaux corporate — devis gratuit",
  "3 âmes olfactives exclusives",
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Utility bar */}
      <div
        style={{ borderBottom: "1px solid rgba(245,240,235,0.12)" }}
        className="bg-[#0D0D0D] overflow-hidden"
      >
        <div className="animate-marquee inline-block whitespace-nowrap py-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-9 text-[10px] tracking-[0.16em] uppercase" style={{ color: "rgba(245,240,235,0.45)" }}>
              {item}
              <span className="mx-3" style={{ color: "#C8A96E" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header
        className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm"
        style={{ borderBottom: "1px solid rgba(245,240,235,0.08)" }}
      >
        <div className="container-braise flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 400, letterSpacing: "0.08em", color: "#F5F0EB" }}>
              BRAISE
            </span>
            <span className="text-[9px] tracking-[0.22em] uppercase" style={{ color: "#C8A96E" }}>
              Studio olfactif
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-[#C8A96E]"
                style={{ color: "rgba(245,240,235,0.7)", fontWeight: 400 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-4">
            <Link href="/les-coffrets" className="hidden md:inline-flex btn-or text-[10px] py-3 px-6">
              Commander
            </Link>
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span className="block w-5 h-px bg-[#F5F0EB] transition-all" style={{ transform: open ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
              <span className="block w-5 h-px bg-[#F5F0EB] transition-all" style={{ opacity: open ? 0 : 1 }} />
              <span className="block w-5 h-px bg-[#F5F0EB] transition-all" style={{ transform: open ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#161412]" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
            <nav className="container-braise flex flex-col py-6 gap-5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[12px] tracking-[0.14em] uppercase"
                  style={{ color: "rgba(245,240,235,0.75)", fontWeight: 400 }}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/les-coffrets" onClick={() => setOpen(false)} className="btn-or self-start mt-2">
                Commander
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
