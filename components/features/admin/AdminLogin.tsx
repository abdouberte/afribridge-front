"use client";

import { useState } from "react";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
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
        return;
      }
      onLogin();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-afri-hero flex items-center justify-center px-4">
      <div
        className="bg-white border-2 border-afri-border rounded-2xl p-8 w-full max-w-sm"
        style={{ boxShadow: "6px 6px 0 #E8D0B0" }}
      >
        <p className="text-xl font-black text-afri-text mb-1">
          Afri<span className="text-afri-terra">Bridge</span>
        </p>
        <p className="text-xs font-bold text-afri-text-3 uppercase tracking-wider mb-6">
          Accès administration
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
              Mot de passe
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
              className={[
                "h-11 px-4 border-2 rounded-xl outline-none text-sm font-semibold",
                "bg-afri-cream text-afri-text placeholder:text-afri-text-3",
                "transition-colors duration-150",
                error
                  ? "border-afri-error focus:border-afri-error"
                  : "border-afri-border focus:border-afri-terra",
              ].join(" ")}
            />
            {error && (
              <p className="text-xs font-semibold text-afri-error">
                ⚠ Mot de passe incorrect.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={[
              "h-11 font-extrabold text-sm rounded-xl border-2 transition-colors duration-150",
              loading
                ? "bg-afri-terra-light border-afri-border text-afri-text-3 cursor-not-allowed"
                : "bg-afri-terra text-white border-afri-terra-dark hover:bg-afri-terra-dark",
            ].join(" ")}
            style={!loading ? { boxShadow: "3px 3px 0 #A8481A" } : undefined}
          >
            {loading ? "Vérification…" : "Accéder au back-office →"}
          </button>
        </form>
      </div>
    </div>
  );
}
