"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const SITES = [
  "Amazon",
  "AliExpress",
  "eBay",
  "Zara",
  "ASOS",
  "IKEA",
  "Nike",
  "+ tout site",
];

export default function HeroForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Colle un lien produit pour continuer.");
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setError("Ce lien ne semble pas valide.");
      return;
    }
    setError("");
    router.push(`/commande?url=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Champ URL */}
      <div className="flex border border-white/15 rounded-xl overflow-hidden bg-white/5 mb-3">
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          placeholder="Colle n'importe quel lien produit…"
          className={[
            "flex-1 bg-transparent border-none outline-none",
            "px-4 py-3 text-sm font-semibold text-white",
            "placeholder:text-white/30 min-w-0",
          ].join(" ")}
          inputMode="url"
          autoComplete="off"
          autoCapitalize="none"
        />
        <button
          type="submit"
          className={[
            "bg-afri-terra text-white border-none",
            "px-4 py-3 text-sm font-extrabold",
            "whitespace-nowrap shrink-0",
            "hover:bg-afri-terra-dark transition-colors duration-150",
            "active:scale-95",
          ].join(" ")}
        >
          Devis →
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="text-xs font-semibold text-afri-terra-light mb-3">
          ⚠ {error}
        </p>
      )}

      {/* Sites supportés */}
      <div className="flex flex-wrap gap-2">
        {SITES.map((site) => (
          <span
            key={site}
            className="bg-white/7 border border-white/10 rounded-md px-2 py-1 text-xs font-700 text-white/45"
          >
            {site}
          </span>
        ))}
      </div>
    </form>
  );
}
