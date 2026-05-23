"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ORDER_KEY = "braise_last_order";

const PAY_LABELS: Record<string, string> = {
  cod:      "Paiement à la livraison",
  cmi:      "Carte bancaire (CMI)",
  virement: "Virement bancaire",
  stripe:   "Stripe — international",
};

type OrderItem = { name: string; ref?: string; ame?: string; price: number; qty?: number };
type Delivery  = { prenom?: string; nom?: string; tel?: string; ville?: string; deliveryMode?: string; date?: string };
type Order     = { ref?: string; total?: number; items?: OrderItem[]; payment?: string; delivery?: Delivery };

const fmt = (n: number) => Number(n).toLocaleString("fr-FR");

export default function MerciPage() {
  const [order,   setOrder]   = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      if (raw) setOrder(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  if (!mounted) return null;

  const items    = order?.items    || [];
  const delivery = order?.delivery || {};
  const total    = order?.total    || items.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  const waText = order
    ? `Bonjour Braise 🔥\n\nJ'ai passé une commande (${order.ref || ""}) et j'ai une question.\n\n${items.map(i => `▸ ${i.name} — ${i.qty || 1}×${fmt(i.price)} MAD`).join("\n")}\n\nTotal : ${fmt(total)} MAD`
    : "Bonjour Braise 🔥";

  const metaFields: [string, string][] = order ? [
    ["Destinataire", [delivery.prenom, delivery.nom].filter(Boolean).join(" ") || "—"],
    ["Téléphone",    delivery.tel || "—"],
    ["Ville",        delivery.ville || "—"],
    ["Livraison",    delivery.deliveryMode === "asap" ? "Dès que possible" : (delivery.date || "—")],
    ["Paiement",     PAY_LABELS[order.payment || ""] || order.payment || "—"],
    ["Statut",       "En préparation"],
  ] : [];

  return (
    <div className="min-h-screen bg-[#0D0D0D]" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
      <div className="container-braise" style={{ maxWidth: "760px" }}>

        {/* Check ring */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-11"
          style={{ border: "1px solid #C8A96E" }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C8A96E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="8 20 16 30 32 10" />
          </svg>
        </div>

        <p className="text-center text-[11px] tracking-[0.28em] uppercase mb-5" style={{ color: "#C8A96E" }}>
          — {order ? `Référence ${order.ref || ""}` : "Commande confirmée"}
        </p>

        <h1 className="heading-xl text-center mb-6" style={{ color: "#F5F0EB" }}>
          Merci.<br />
          <em style={{ fontStyle: "italic", color: "#C8A96E" }}>
            Votre coffret est<br />en chemin.
          </em>
        </h1>

        <p className="text-center text-base leading-relaxed mb-16 mx-auto" style={{ color: "rgba(245,240,235,0.55)", maxWidth: "520px" }}>
          {delivery.prenom
            ? `Votre coffret est en cours d'assemblage dans notre atelier à Casablanca, ${delivery.prenom}. Vous serez contacté(e) par téléphone pour confirmer la livraison.`
            : "Votre coffret est en cours d'assemblage dans notre atelier à Casablanca. Vous serez contacté(e) pour confirmer la livraison."
          }
        </p>

        {/* Order card */}
        <div className="relative mb-12" style={{ background: "#161412", border: "1px solid rgba(245,240,235,0.08)" }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C8A96E, transparent)" }} />

          {/* Header */}
          <div className="flex justify-between items-center px-9 py-7 flex-wrap gap-3" style={{ borderBottom: "1px solid rgba(245,240,235,0.08)" }}>
            <h3 className="text-xl" style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB" }}>Récapitulatif</h3>
            {order?.ref && (
              <span className="text-[12px] tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full" style={{ border: "1px solid rgba(200,169,110,0.3)", color: "#C8A96E" }}>
                {order.ref}
              </span>
            )}
          </div>

          {/* Items */}
          <div className="px-9">
            {!order ? (
              <div className="py-12 text-center text-sm" style={{ color: "rgba(245,240,235,0.45)" }}>
                Aucune commande récente.{" "}
                <Link href="/les-coffrets" className="underline" style={{ color: "#C8A96E" }}>Découvrir les coffrets →</Link>
              </div>
            ) : items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-5 gap-4"
                style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(245,240,235,0.07)" : "none" }}
              >
                <div>
                  <p className="text-lg mb-1" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#F5F0EB" }}>{item.name}</p>
                  <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(245,240,235,0.35)" }}>
                    {[item.ref, item.ame ? `Âme ${item.ame}` : "", `Qté ${item.qty || 1}`].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <p className="text-xl whitespace-nowrap" style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB" }}>
                  {fmt(item.price * (item.qty || 1))}{" "}
                  <span className="text-[11px] tracking-[0.2em]" style={{ color: "rgba(245,240,235,0.35)" }}>MAD</span>
                </p>
              </div>
            ))}
          </div>

          {/* Meta grid */}
          {metaFields.length > 0 && (
            <div className="grid grid-cols-2 mx-9" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
              {metaFields.map(([label, value], i) => (
                <div
                  key={label}
                  className="py-5"
                  style={{
                    borderRight:  i % 2 === 0 ? "1px solid rgba(245,240,235,0.08)" : "none",
                    paddingRight: i % 2 === 0 ? "24px" : "0",
                    paddingLeft:  i % 2 !== 0 ? "24px" : "0",
                  }}
                >
                  <p className="text-[9px] tracking-[0.26em] uppercase mb-1.5" style={{ color: "rgba(245,240,235,0.3)" }}>{label}</p>
                  <p className="text-sm" style={{ color: "#F5F0EB" }}>{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Total */}
          {order && (
            <div className="flex justify-between items-baseline px-9 py-6" style={{ borderTop: "1px solid rgba(200,169,110,0.4)" }}>
              <span className="text-[11px] tracking-[0.24em] uppercase" style={{ color: "rgba(245,240,235,0.45)" }}>Total à régler</span>
              <span className="text-5xl" style={{ fontFamily: "var(--font-serif)", color: "#C8A96E" }}>
                {fmt(total)}{" "}
                <span className="text-sm tracking-[0.2em]" style={{ color: "rgba(245,240,235,0.45)" }}>MAD</span>
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={`https://wa.me/212661960609?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[12px] tracking-[0.2em] uppercase font-medium transition-all hover:-translate-y-0.5"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.3 2 2 8.3 2 16c0 2.8.8 5.4 2.3 7.6L2 30l6.6-2.2c2.2 1.2 4.7 1.9 7.4 1.9 7.7 0 14-6.3 14-14S23.7 2 16 2zm0 25.6c-2.4 0-4.7-.7-6.7-1.9l-.5-.3-4 1.3 1.3-3.9-.3-.5C4.7 20.5 4 18.3 4 16 4 9.4 9.4 4 16 4s12 5.4 12 12-5.4 11.6-12 11.6zm6.6-8.7c-.4-.2-2.2-1.1-2.5-1.2s-.6-.2-.9.2c-.3.4-1 1.2-1.2 1.4-.2.2-.4.2-.8 0-.4-.2-1.6-.6-3-1.9-1.1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.4-.7.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-.9.5-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.2-.9 2.5-1.7.3-.9.3-1.6.2-1.7-.1-.2-.4-.3-.8-.5z"/>
            </svg>
            Une question ? WhatsApp
          </a>
          <Link href="/" className="btn-outline">
            Retour à l'accueil →
          </Link>
        </div>

      </div>
    </div>
  );
}
