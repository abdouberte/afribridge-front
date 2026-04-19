import type { Metadata } from "next";
import Link from "next/link";
import { getOrderByRef } from "@/lib/api";
import OrderTimeline from "@/components/features/timeline/OrderTimeline";
import SearchForm from "@/components/features/SearchForm";

export const metadata: Metadata = {
  title: "Suivi de commande — AfriBridge",
  description: "Suis ta commande AfriBridge en temps réel.",
};

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

interface Props {
  searchParams: Promise<{ ref?: string }>;
}

export default async function SuiviPage({ searchParams }: Props) {
  const { ref: rawRef } = await searchParams;
  const ref = rawRef?.trim().toUpperCase() ?? "";
  const order = ref ? await getOrderByRef(ref) : null;

  return (
    <main className="min-h-screen bg-afri-cream font-sans">
      {/* ── Bande Kente ── */}
      <div className="flex h-1.5">
        {KENTE.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      {/* ── Navigation ── */}
      <nav className="bg-white border-b-2 border-afri-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-afri-text-3 hover:text-afri-terra transition-colors"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Accueil
          </Link>
          <span className="text-base font-black text-afri-text">
            Afri<span className="text-afri-terra">Bridge</span>
          </span>
          <Link
            href="/commande"
            className="text-xs font-bold text-afri-terra hover:underline"
          >
            Commander
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="bg-afri-terra">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-10">
          <p className="text-xs font-extrabold tracking-widest uppercase text-white/60 mb-2">
            AfriBridge
          </p>
          <h1 className="text-2xl font-black text-white leading-tight">
            Suivre ma commande
          </h1>
          <p className="text-sm font-semibold text-white/60 mt-1">
            Saisis ton numéro de commande (ex : AFR-2025-0042)
          </p>
        </div>
      </div>

      {/* ── Carte recherche flottante ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-5 relative z-10">
        <div
          className="bg-white border-2 border-afri-border rounded-2xl p-4"
          style={{ boxShadow: "4px 4px 0 #E8D0B0" }}
        >
          <SearchForm initialRef={ref} />
        </div>
      </div>

      {/* ── Résultat ── */}
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-16">
        {/* État initial — aucune recherche */}
        {!ref && (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="w-16 h-16 rounded-full bg-afri-terra-light flex items-center justify-center mb-4">
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#C85A1E"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-extrabold text-afri-text mb-1">
              Suis ta commande
            </p>
            <p className="text-xs font-semibold text-afri-text-3 leading-relaxed max-w-xs">
              Tu as reçu un numéro de commande par SMS après ton paiement.
              Saisis-le ci-dessus.
            </p>
          </div>
        )}

        {/* Commande non trouvée */}
        {ref && !order && (
          <div
            className="flex flex-col items-center text-center py-10 bg-white border-2 border-afri-border rounded-2xl px-6"
            style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
          >
            <div className="w-14 h-14 rounded-full bg-afri-error-light flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#C0392B"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-sm font-extrabold text-afri-text mb-2">
              Commande introuvable
            </p>
            <p className="text-xs font-semibold text-afri-text-3 leading-relaxed mb-5">
              Aucune commande trouvée pour{" "}
              <strong className="text-afri-terra">{ref}</strong>. Vérifie le
              numéro reçu par SMS ou contacte-nous.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Bonjour, je cherche ma commande ${ref}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-afri-terra text-white text-sm font-extrabold rounded-xl border-2 border-afri-terra-dark"
              style={{ boxShadow: "2px 2px 0 #A8481A" }}
            >
              Contacter le support →
            </a>
          </div>
        )}

        {/* Commande trouvée */}
        {order && <OrderTimeline order={order} />}
      </div>

      {/* ── Footer ── */}
      <footer style={{ background: "#1C0E06" }}>
        <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-base font-black text-white">
            Afri<span className="text-afri-terra">Bridge</span>
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Accueil
            </Link>
            <Link
              href="/commande"
              className="text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Passer commande
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
