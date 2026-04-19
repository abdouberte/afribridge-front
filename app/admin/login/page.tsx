"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const KENTE = [
  "#C85A1E",
  "#FDF6EC",
  "#D4920A",
  "#FDF6EC",
  "#1B7A52",
  "#FDF6EC",
  "#C85A1E",
  "#FDF6EC",
  "#D4920A",
  "#FDF6EC",
  "#C85A1E",
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) {
        setError(true);
        setPw("");
        return;
      }
      router.push("/admin");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen font-sans flex flex-col">
      {/* ── Kente ── */}
      <div className="flex h-1.5 shrink-0">
        {KENTE.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      {/* ── Hero sombre ── */}
      <div
        className="px-6 pt-10 pb-12 md:pt-16 md:pb-16"
        style={{ background: "#1C0E06" }}
      >
        <div className="max-w-sm mx-auto">
          {/* Logo */}
          <p className="text-xl font-black text-white mb-8">
            Afri<span className="text-afri-terra">Bridge</span>
          </p>

          {/* Titre */}
          <p className="text-xs font-extrabold tracking-widest uppercase text-white/40 mb-2">
            Zone privée
          </p>
          <h1 className="text-3xl font-black text-white leading-tight mb-2">
            Accès
            <br />
            <span className="text-afri-terra">Back-office</span>
          </h1>
          <p
            className="text-sm font-semibold mb-6"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Accès restreint — fondateur AfriBridge uniquement.
          </p>

          {/* Badge sécurité */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-afri-green shrink-0" />
            <span
              className="text-xs font-bold"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Connexion sécurisée · Session 8h
            </span>
          </div>
        </div>
      </div>

      {/* ── Formulaire ── */}
      <div className="flex-1 bg-afri-cream px-6 py-8">
        <div className="max-w-sm mx-auto">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••"
                disabled={loading}
                autoComplete="current-password"
                autoFocus
                className={[
                  "h-12 px-4 border-2 rounded-xl outline-none",
                  "text-sm font-semibold text-afri-text bg-white",
                  "placeholder:text-afri-text-3 transition-colors duration-150",
                  error
                    ? "border-afri-error focus:border-afri-error"
                    : "border-afri-border focus:border-afri-terra",
                ].join(" ")}
              />
              {error && (
                <p className="text-xs font-semibold text-afri-error flex items-center gap-1">
                  <span aria-hidden>⚠</span>
                  Mot de passe incorrect. Réessaie.
                </p>
              )}
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className={[
                "w-full h-12 font-extrabold text-sm rounded-xl border-2",
                "transition-colors duration-150",
                loading
                  ? "bg-afri-terra-light border-afri-border text-afri-text-3 cursor-not-allowed"
                  : "bg-afri-terra text-white border-afri-terra-dark hover:bg-afri-terra-dark",
              ].join(" ")}
              style={!loading ? { boxShadow: "3px 3px 0 #A8481A" } : undefined}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-afri-text-3 animate-blink [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-afri-text-3 animate-blink [animation-delay:200ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-afri-text-3 animate-blink [animation-delay:400ms]" />
                  Vérification…
                </span>
              ) : (
                "Connexion →"
              )}
            </button>
          </form>

          {/* Retour */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs font-bold text-afri-text-3 hover:text-afri-terra transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
