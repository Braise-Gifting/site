"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CART_KEY = "braise_cart";
const ORDER_KEY = "braise_last_order";

type CartItem = {
  _key: string;
  name: string;
  price: number;
  qty: number;
  ref?: string;
  ame?: string;
  img?: string;
  produit_id?: string | null;
  coffret_id?: string | null;
};

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}

function saveOrder(data: object) {
  localStorage.setItem(ORDER_KEY, JSON.stringify({ ...data, createdAt: new Date().toISOString() }));
}

const PAY_OPTIONS = [
  { id: "cod",      label: "Paiement à la livraison",    desc: "Vous payez en espèces à la réception. Aucune avance. Recommandé.",                    tag: "Le préféré" },
  { id: "cmi",      label: "Carte bancaire marocaine",   desc: "Paiement sécurisé via CMI. Carte CMI, Visa ou Mastercard émise au Maroc.",             tag: "Sécurisé",  icons: ["CMI", "VISA", "MC"] },
  { id: "virement", label: "Virement bancaire",          desc: "IBAN envoyé par email après validation. Idéal pour les commandes corporate.",           tag: "B2B" },
  { id: "stripe",   label: "Stripe — international",     desc: "Pour les commandes depuis l'étranger. Conversion automatique en MAD.",                  tag: "Hors Maroc", icons: ["VISA", "MC", "AMEX"] },
];

const VILLES = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès", "Agadir", "Autre"];

const STEPS = [
  { n: 1, label: "Panier" },
  { n: 2, label: "Livraison" },
  { n: 3, label: "Paiement" },
];

export default function CommandePage() {
  const router = useRouter();
  const [step, setStep]           = useState(1);
  const [items, setItems]         = useState<CartItem[]>([]);
  const [promo, setPromo]         = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError]     = useState(false);
  const [payMethod, setPayMethod] = useState("cod");
  const [loading, setLoading]     = useState(false);
  const [form, setForm]           = useState({
    prenom: "", nom: "", tel: "", email: "",
    adresse: "", ville: "Casablanca", postal: "",
    deliveryMode: "asap", date: "", message: "",
  });

  useEffect(() => { setItems(getCart()); }, []);

  const subtotal = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total    = subtotal - discount;
  const fmt      = (n: number) => n.toLocaleString("fr-FR");

  function updateQty(key: string, delta: number) {
    const updated = items.map(i =>
      i._key === key ? { ...i, qty: Math.max(1, (i.qty || 1) + delta) } : i
    );
    setItems(updated);
    saveCart(updated);
  }

  function removeItem(key: string) {
    const updated = items.filter(i => i._key !== key);
    setItems(updated);
    saveCart(updated);
  }

  function applyPromo() {
    if (promo.toUpperCase() === "BRAISE10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 1500);
    }
  }

  async function submitOrder() {
    const { prenom, nom, tel, email, adresse, ville } = form;
    if (!prenom || !nom || !tel || !email || !adresse) {
      setStep(2);
      return;
    }
    setLoading(true);
    const payload = {
      client: { prenom, nom, telephone: tel, email, ville },
      adresse_livraison: `${adresse}, ${ville}`,
      message_perso: form.message || null,
      mode_paiement: payMethod === "cod" ? "a_la_livraison" : payMethod,
      items: items.map(i => ({
        produit_id:    i.produit_id || null,
        coffret_id:    i.coffret_id || null,
        quantite:      i.qty || 1,
        prix_unitaire: i.price,
      })),
    };
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || "";
      const res  = await fetch(`${base}/api/commandes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Erreur : " + (data.error || "Problème serveur"));
        setLoading(false);
        return;
      }
      saveOrder({ ref: data.ref, total: data.total || total, items, payment: payMethod, delivery: form });
      clearCart();
      router.push("/merci");
    } catch {
      alert("Impossible de contacter le serveur. Vérifiez votre connexion.");
      setLoading(false);
    }
  }

  const inputCls = "bg-transparent px-4 py-3.5 text-[15px] outline-none transition-colors";
  const inputStyle = { border: "1px solid rgba(245,240,235,0.12)", color: "#F5F0EB", borderRadius: "2px" };
  const labelCls = "text-[10px] tracking-[0.24em] uppercase";
  const labelStyle = { fontFamily: "monospace", color: "rgba(245,240,235,0.45)" };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-16">
      <div className="container-braise">

        {/* Stepper */}
        <div className="flex items-center justify-center gap-3 mb-16">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-3">
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all"
                style={{
                  border:  `1px solid ${step === s.n ? "#C8A96E" : step > s.n ? "rgba(245,240,235,0.25)" : "rgba(245,240,235,0.1)"}`,
                  color:   step === s.n ? "#C8A96E" : step > s.n ? "#F5F0EB" : "rgba(245,240,235,0.35)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                  style={{
                    background: step > s.n ? "#F5F0EB" : step === s.n ? "#C8A96E" : "rgba(245,240,235,0.06)",
                    color:      step > s.n || step === s.n ? "#0D0D0D" : "inherit",
                  }}
                >
                  {step > s.n ? "✓" : `0${s.n}`}
                </span>
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px" style={{ background: "rgba(245,240,235,0.08)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-start">

          {/* Left — Steps */}
          <div>

            {/* STEP 1 — PANIER */}
            {step === 1 && (
              <div>
                <h2 className="heading-lg mb-2" style={{ color: "#F5F0EB" }}>
                  Ton <em style={{ fontStyle: "italic", color: "#C8A96E" }}>panier</em>.
                </h2>
                <p className="text-sm mb-10" style={{ color: "rgba(245,240,235,0.45)" }}>
                  {items.length
                    ? `${items.reduce((s, i) => s + (i.qty || 1), 0)} article(s) · Modifiable à tout moment`
                    : "Panier vide"}
                </p>

                {items.length === 0 ? (
                  <div className="py-16 text-center" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                    <p className="text-sm mb-6" style={{ color: "rgba(245,240,235,0.45)" }}>Votre panier est vide.</p>
                    <Link href="/les-coffrets" className="btn-or">Découvrir les coffrets</Link>
                  </div>
                ) : (
                  <>
                    <div style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                      {items.map(item => (
                        <div
                          key={item._key}
                          className="grid gap-6 py-7"
                          style={{
                            gridTemplateColumns: "96px 1fr auto",
                            borderBottom: "1px solid rgba(245,240,235,0.08)",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="aspect-square overflow-hidden"
                            style={{ border: "1px solid rgba(245,240,235,0.08)", background: "#161412" }}
                          >
                            {item.img && <img src={item.img} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex flex-col gap-1">
                            {item.ref && (
                              <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "#C8A96E" }}>{item.ref}</p>
                            )}
                            <h3 className="text-lg" style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB" }}>{item.name}</h3>
                            {item.ame && (
                              <p className="text-xs" style={{ color: "rgba(245,240,235,0.45)" }}>
                                Âme · {item.ame.charAt(0).toUpperCase() + item.ame.slice(1)}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center overflow-hidden rounded-full" style={{ border: "1px solid rgba(245,240,235,0.12)" }}>
                                <button onClick={() => updateQty(item._key, -1)} className="w-8 h-8 flex items-center justify-center transition-colors hover:text-[#C8A96E]" style={{ color: "#F5F0EB" }}>−</button>
                                <span className="w-8 text-center text-sm" style={{ fontFamily: "monospace" }}>{item.qty || 1}</span>
                                <button onClick={() => updateQty(item._key, 1)}  className="w-8 h-8 flex items-center justify-center transition-colors hover:text-[#C8A96E]" style={{ color: "#F5F0EB" }}>+</button>
                              </div>
                              <button
                                onClick={() => removeItem(item._key)}
                                className="text-[11px] tracking-[0.18em] uppercase transition-colors hover:text-[#B85C38]"
                                style={{ color: "rgba(245,240,235,0.3)" }}
                              >Retirer</button>
                            </div>
                          </div>
                          <p className="text-xl text-right" style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB" }}>
                            {fmt(item.price * (item.qty || 1))}
                            <span className="text-[11px] ml-1 tracking-[0.2em]" style={{ color: "rgba(245,240,235,0.35)" }}>MAD</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-10 pt-6" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                      <input
                        type="text"
                        placeholder="Code promo"
                        value={promo}
                        onChange={e => setPromo(e.target.value)}
                        className="flex-1 bg-transparent rounded-full px-5 py-3.5 text-[12px] tracking-[0.16em] uppercase outline-none transition-colors"
                        style={{ border: "1px solid rgba(245,240,235,0.12)", color: "#F5F0EB" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#C8A96E")}
                        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(245,240,235,0.12)")}
                      />
                      <button
                        onClick={applyPromo}
                        className="px-6 rounded-full text-[11px] tracking-[0.22em] uppercase transition-all"
                        style={{
                          border:     "1px solid #C8A96E",
                          color:      promoApplied ? "#0D0D0D" : "#C8A96E",
                          background: promoApplied ? "#C8A96E" : "transparent",
                        }}
                      >
                        {promoApplied ? "✓ Appliqué" : promoError ? "Invalide" : "Appliquer"}
                      </button>
                    </div>
                  </>
                )}

                <div className="flex justify-between items-center mt-14 pt-8" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                  <Link href="/les-coffrets" className="text-[11px] tracking-[0.22em] uppercase transition-colors hover:text-[#C8A96E]" style={{ color: "rgba(245,240,235,0.4)" }}>
                    ← Continuer mes achats
                  </Link>
                  {items.length > 0 && (
                    <button onClick={() => setStep(2)} className="btn-or">
                      Passer à la livraison →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2 — LIVRAISON */}
            {step === 2 && (
              <div>
                <h2 className="heading-lg mb-2" style={{ color: "#F5F0EB" }}>
                  Où <em style={{ fontStyle: "italic", color: "#C8A96E" }}>livrer</em> ce coffret ?
                </h2>
                <p className="text-sm mb-10" style={{ color: "rgba(245,240,235,0.45)" }}>
                  Casablanca en J+1 · Reste du Maroc en J+3
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { id: "prenom", label: "Prénom *",   type: "text",  placeholder: "Yasmine" },
                    { id: "nom",    label: "Nom *",      type: "text",  placeholder: "Benkirane" },
                    { id: "tel",    label: "Téléphone *",type: "tel",   placeholder: "+212 6 61 96 06 09" },
                    { id: "email",  label: "Email *",    type: "email", placeholder: "yasmine@example.com" },
                  ].map(f => (
                    <div key={f.id} className="flex flex-col gap-2">
                      <label className={labelCls} style={labelStyle}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                        className={inputCls}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "#C8A96E")}
                        onBlur={e  => (e.currentTarget.style.borderColor = "rgba(245,240,235,0.12)")}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className={labelCls} style={labelStyle}>Adresse *</label>
                    <input
                      type="text"
                      placeholder="Rue Tahar Sebti, Résidence Almaz, Apt 12"
                      value={form.adresse}
                      onChange={e => setForm({ ...form, adresse: e.target.value })}
                      className={inputCls}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "#C8A96E")}
                      onBlur={e  => (e.currentTarget.style.borderColor = "rgba(245,240,235,0.12)")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={labelCls} style={labelStyle}>Ville *</label>
                    <select
                      value={form.ville}
                      onChange={e => setForm({ ...form, ville: e.target.value })}
                      className="bg-[#0D0D0D] px-4 py-3.5 text-[15px] outline-none"
                      style={inputStyle}
                    >
                      {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={labelCls} style={labelStyle}>Code postal</label>
                    <input
                      type="text"
                      placeholder="20200"
                      value={form.postal}
                      onChange={e => setForm({ ...form, postal: e.target.value })}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={labelCls} style={labelStyle}>Livraison</label>
                    <select
                      value={form.deliveryMode}
                      onChange={e => setForm({ ...form, deliveryMode: e.target.value })}
                      className="bg-[#0D0D0D] px-4 py-3.5 text-[15px] outline-none"
                      style={inputStyle}
                    >
                      <option value="asap">Dès que possible</option>
                      <option value="date">Choisir une date</option>
                    </select>
                  </div>

                  {form.deliveryMode === "date" && (
                    <div className="flex flex-col gap-2">
                      <label className={labelCls} style={labelStyle}>Date de livraison</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                        className={inputCls}
                        style={inputStyle}
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className={labelCls} style={labelStyle}>Message manuscrit pour le destinataire</label>
                    <textarea
                      rows={3}
                      placeholder="« Pour que tu te rappelles que je pense à toi, même loin. »"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="bg-transparent px-4 py-3.5 text-[15px] outline-none resize-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-14 pt-8" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                  <button onClick={() => setStep(1)} className="text-[11px] tracking-[0.22em] uppercase transition-colors hover:text-[#C8A96E]" style={{ color: "rgba(245,240,235,0.4)" }}>
                    ← Retour au panier
                  </button>
                  <button onClick={() => setStep(3)} className="btn-or">
                    Passer au paiement →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — PAIEMENT */}
            {step === 3 && (
              <div>
                <h2 className="heading-lg mb-2" style={{ color: "#F5F0EB" }}>
                  Comment <em style={{ fontStyle: "italic", color: "#C8A96E" }}>payer</em> ?
                </h2>
                <p className="text-sm mb-10" style={{ color: "rgba(245,240,235,0.45)" }}>
                  Quatre options · 100% sécurisé
                </p>

                <div className="flex flex-col gap-3">
                  {PAY_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setPayMethod(opt.id)}
                      className="grid gap-4 p-6 text-left transition-all"
                      style={{
                        gridTemplateColumns: "20px 1fr auto",
                        alignItems: "start",
                        border:     `1px solid ${payMethod === opt.id ? "#C8A96E" : "rgba(245,240,235,0.08)"}`,
                        background: payMethod === opt.id ? "rgba(200,169,110,0.04)" : "transparent",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        className="mt-1 w-5 h-5 rounded-full relative flex-shrink-0"
                        style={{ border: `1px solid ${payMethod === opt.id ? "#C8A96E" : "rgba(245,240,235,0.2)"}` }}
                      >
                        {payMethod === opt.id && (
                          <div className="absolute inset-[3px] rounded-full" style={{ background: "#C8A96E" }} />
                        )}
                      </div>
                      <div>
                        <p className="text-base mb-1" style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB" }}>{opt.label}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.45)" }}>{opt.desc}</p>
                        {opt.icons && (
                          <div className="flex gap-2 mt-2">
                            {opt.icons.map(ic => (
                              <span key={ic} className="text-[9px] tracking-[0.16em] px-1.5 py-0.5" style={{ border: "1px solid rgba(245,240,235,0.12)", color: "rgba(245,240,235,0.35)" }}>{ic}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span
                        className="text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full flex-shrink-0"
                        style={{ border: "1px solid #C8A96E", color: "#C8A96E" }}
                      >{opt.tag}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-14 pt-8" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                  <button onClick={() => setStep(2)} className="text-[11px] tracking-[0.22em] uppercase transition-colors hover:text-[#C8A96E]" style={{ color: "rgba(245,240,235,0.4)" }}>
                    ← Retour à la livraison
                  </button>
                  <button onClick={submitOrder} disabled={loading} className="btn-or disabled:opacity-60">
                    {loading ? "Envoi en cours…" : "Confirmer la commande →"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right — Summary */}
          <div className="p-8 sticky top-28" style={{ background: "#161412", border: "1px solid rgba(245,240,235,0.08)" }}>
            <h3 className="text-xl mb-1" style={{ fontFamily: "var(--font-serif)", color: "#F5F0EB" }}>Récapitulatif</h3>
            <p className="text-[10px] tracking-[0.22em] uppercase mb-7" style={{ color: "rgba(245,240,235,0.3)" }}>— Modifiable à chaque étape</p>

            <div style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
              {[
                ["Sous-total",           `${fmt(subtotal)} MAD`],
                ["Personnalisation",     "Incluse"],
                ["Livraison Casablanca", "Offerte"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-3 text-sm" style={{ borderBottom: "1px solid rgba(245,240,235,0.08)", color: "rgba(245,240,235,0.55)" }}>
                  <span>{label}</span><span style={{ color: "#F5F0EB" }}>{value}</span>
                </div>
              ))}
              {promoApplied && (
                <div className="flex justify-between py-3 text-sm" style={{ borderBottom: "1px solid rgba(245,240,235,0.08)", color: "#B85C38" }}>
                  <span>Code BRAISE10</span><span>−{fmt(discount)} MAD</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-baseline py-6 mt-4" style={{ borderTop: "1px solid #C8A96E" }}>
              <span className="text-[11px] tracking-[0.24em] uppercase" style={{ color: "rgba(245,240,235,0.45)" }}>Total à payer</span>
              <span className="text-4xl" style={{ fontFamily: "var(--font-serif)", color: "#C8A96E" }}>
                {fmt(total)}
                <span className="text-sm ml-1 tracking-[0.2em]" style={{ color: "rgba(245,240,235,0.45)" }}>MAD</span>
              </span>
            </div>

            <ul className="flex flex-col gap-3 mt-6 pt-6" style={{ borderTop: "1px solid rgba(245,240,235,0.08)" }}>
              {[
                "Échange contre une autre âme — sous 7 jours, sans frais.",
                "Coffret assemblé à la main avant expédition.",
                "Carte manuscrite et sceau de cire inclus.",
                "Paiement à la livraison disponible.",
              ].map(item => (
                <li key={item} className="flex gap-3 text-[12px] leading-relaxed" style={{ color: "rgba(245,240,235,0.45)" }}>
                  <span className="flex-shrink-0" style={{ color: "#C8A96E" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
