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

export default function NotFound() {
  return (
    <main className="min-h-screen bg-afri-cream font-sans">
      {/* ── Kente ── */}
      <div className="flex h-1.5">
        {KENTE.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      {/* ── Nav ── */}
      <nav className="bg-white border-b-2 border-afri-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-center">
          <span className="text-base font-black text-afri-text">
            Afri<span className="text-afri-terra">Bridge</span>
          </span>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-16 pb-16 flex flex-col items-center text-center gap-6">
        {/* ── Numéro 404 ── */}
        <div className="relative">
          <p
            className="text-[96px] font-black leading-none"
            style={{ color: "#F0E4D0" }}
          >
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full bg-afri-terra-light border-2 flex items-center justify-center"
              style={{ borderColor: "#F0C8A0", boxShadow: "3px 3px 0 #F0C8A0" }}
            >
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#C85A1E"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Message ── */}
        <div>
          <h1 className="text-2xl font-black text-afri-text mb-2">
            Page introuvable
          </h1>
          <p className="text-sm font-semibold text-afri-text-3 leading-relaxed">
            Cette page n'existe pas ou a été déplacée. Retourne à l'accueil pour
            passer une commande.
          </p>
        </div>

        {/* ── CTAs ── */}
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/"
            className="block w-full py-4 bg-afri-terra text-white text-base font-extrabold rounded-xl border-2 border-afri-terra-dark text-center hover:bg-afri-terra-dark transition-colors"
            style={{ boxShadow: "3px 3px 0 #A8481A" }}
          >
            Retour à l'accueil →
          </Link>
          <Link
            href="/suivi"
            className="block w-full py-3.5 bg-white text-afri-terra text-sm font-extrabold rounded-xl border-2 border-afri-terra text-center hover:bg-afri-terra-light transition-colors"
            style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
          >
            Suivre une commande
          </Link>
        </div>
      </div>
    </main>
  );
}
