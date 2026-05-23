"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setDone(true); }}
      style={{ display: "flex", maxWidth: "540px", margin: "56px auto 0", borderBottom: "1px solid #0D0D0D" }}
    >
      <input
        type="email"
        placeholder="ton adresse e-mail"
        required
        style={{ flex: 1, background: "transparent", border: "none", padding: "18px 4px", fontFamily: "var(--font-sans)", fontSize: "15px", color: "#0D0D0D", outline: "none" }}
      />
      <button
        type="submit"
        style={{ padding: "12px 24px", background: done ? "#B85C38" : "#0D0D0D", color: "#F5F0EB", borderRadius: "999px", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase", margin: "4px 0", transition: "background 300ms ease", whiteSpace: "nowrap" }}
      >
        {done ? "Merci." : "S'inscrire"}
      </button>
    </form>
  );
}
