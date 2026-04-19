"use client";

import {
  DeliveryZone,
  ZONE_LABELS,
  MIN_ORDER_EUR,
  EXCHANGE_RATE,
  QuoteResult,
} from "@/lib/pricing";
import { formatFcfa } from "@/lib/pricing";
import QuoteSummary from "./QuoteSummary";

interface Props {
  url: string;
  priceEur: string;
  zone: DeliveryZone;
  quote: QuoteResult | null;
  error?: string;
  onChangePrice: (v: string) => void;
  onChangeZone: (z: DeliveryZone) => void;
  onChangeUrl: () => void;
  onNext: () => void;
}

export default function StepQuote({
  url,
  priceEur,
  zone,
  quote,
  error,
  onChangePrice,
  onChangeZone,
  onChangeUrl,
  onNext,
}: Props) {
  return (
    <div>
      <h1 className="text-xl font-black text-afri-text mb-1">
        Prix &amp; zone de livraison
      </h1>
      <p className="text-sm text-afri-text-3 font-semibold mb-5 leading-relaxed">
        Ton devis se calcule automatiquement.
      </p>

      {/* URL recap */}
      <div className="flex items-center gap-3 bg-afri-terra-light border border-afri-border rounded-xl px-3 py-2.5 mb-5">
        <div className="w-8 h-8 bg-afri-terra rounded-lg flex items-center justify-center shrink-0">
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.1-1.1"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-extrabold text-afri-terra uppercase tracking-wider mb-0.5">
            Produit sélectionné
          </p>
          <p className="text-xs font-semibold text-afri-text-2 truncate">
            {url}
          </p>
        </div>
        <button
          type="button"
          onClick={onChangeUrl}
          className="text-xs font-extrabold text-afri-terra shrink-0 hover:underline"
        >
          Changer
        </button>
      </div>

      <div className="flex flex-col gap-5 mb-6">
        {/* Prix */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
            Prix du produit <span className="text-afri-terra">*</span>
          </label>
          <div
            className={[
              "flex border-2 rounded-xl overflow-hidden bg-white",
              error
                ? "border-afri-error"
                : "border-afri-border focus-within:border-afri-terra",
            ].join(" ")}
            style={{ transition: "border-color 0.15s" }}
          >
            <input
              type="number"
              value={priceEur}
              onChange={(e) => onChangePrice(e.target.value)}
              placeholder="0"
              min={0}
              step="0.01"
              className="flex-1 h-11 px-3.5 bg-transparent outline-none font-extrabold text-lg text-afri-text placeholder:text-afri-text-3 placeholder:font-semibold placeholder:text-sm"
            />
            <div className="flex items-center px-4 bg-afri-cream border-l-2 border-afri-border text-sm font-extrabold text-afri-terra shrink-0">
              EUR €
            </div>
          </div>
          {error ? (
            <p className="text-xs font-semibold text-afri-error flex items-center gap-1">
              <span aria-hidden>⚠</span> {error}
            </p>
          ) : (
            <p className="text-xs text-afri-text-3">
              Minimum {MIN_ORDER_EUR} € · Taux bloqué {EXCHANGE_RATE} FCFA/€
            </p>
          )}
        </div>

        {/* Zone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
            Zone de livraison <span className="text-afri-terra">*</span>
          </label>
          <div className="flex gap-2">
            {(Object.keys(ZONE_LABELS) as DeliveryZone[]).map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => onChangeZone(z)}
                className={[
                  "flex-1 py-2.5 rounded-xl border-2 text-xs font-extrabold transition-colors duration-150",
                  zone === z
                    ? "bg-afri-terra-light border-afri-terra text-afri-terra"
                    : "bg-white border-afri-border text-afri-text-3 hover:border-afri-terra hover:text-afri-terra",
                ].join(" ")}
              >
                {ZONE_LABELS[z]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Devis live */}
      {quote ? (
        <div className="mb-6">
          <QuoteSummary
            quote={quote}
            zone={zone}
            priceEur={parseFloat(priceEur) || 0}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-28 border-2 border-dashed border-afri-border rounded-2xl mb-6">
          <p className="text-sm text-afri-text-3 font-semibold">
            Saisis un prix pour voir le devis
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={!quote}
        className={[
          "w-full py-4 text-white font-extrabold text-base rounded-xl border-2 transition-colors duration-150",
          quote
            ? "bg-afri-terra border-afri-terra-dark hover:bg-afri-terra-dark"
            : "bg-afri-terra-light border-afri-border text-afri-text-3 cursor-not-allowed",
        ].join(" ")}
        style={quote ? { boxShadow: "3px 3px 0 #A8481A" } : undefined}
      >
        Continuer → Mes informations
      </button>
    </div>
  );
}
