"use client";

import { FormEvent } from "react";
import { DeliveryZone, ZONE_LABELS, QuoteResult } from "@/lib/pricing";
import { formatFcfa } from "@/lib/pricing";
import Loader from "@/components/ui/Loader";

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

interface Props {
  customer: CustomerInfo;
  quote: QuoteResult | null;
  zone: DeliveryZone;
  loading: boolean;
  errors: Record<string, string>;
  onChange: (field: keyof CustomerInfo, value: string) => void;
  onBack: () => void;
  onSubmit: (e: FormEvent) => void;
}

const INPUT_BASE =
  "w-full h-11 px-3.5 font-semibold text-sm text-afri-text bg-white " +
  "border-2 border-afri-border rounded-xl outline-none " +
  "transition-colors duration-150 placeholder:text-afri-text-3 " +
  "focus:border-afri-terra";

const INPUT_ERROR = "border-afri-error focus:border-afri-error";
const INPUT_OK = "border-afri-green";

export default function StepCustomer({
  customer,
  quote,
  zone,
  loading,
  errors,
  onChange,
  onBack,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className="text-xl font-black text-afri-text mb-1">
        Vos informations
      </h1>
      <p className="text-sm text-afri-text-3 font-semibold mb-5 leading-relaxed">
        Pour la livraison et la confirmation par SMS/WhatsApp.
      </p>

      {/* Recap devis compact */}
      {quote && (
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3 mb-6"
          style={{ background: "#1C0E06" }}
        >
          <div>
            <p className="text-xs font-extrabold text-afri-amber uppercase tracking-wider mb-0.5">
              Total à payer
            </p>
            <p className="text-xl font-black text-afri-terra">
              {formatFcfa(quote.totalFcfa)}
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-bold transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Modifier
          </button>
        </div>
      )}

      <div className="flex flex-col gap-5 mb-6">
        {/* Nom */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
            Nom complet <span className="text-afri-terra">*</span>
          </label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Ex : Koné Mamadou"
            autoComplete="name"
            className={[
              INPUT_BASE,
              errors.name ? INPUT_ERROR : customer.name ? INPUT_OK : "",
            ].join(" ")}
          />
          {errors.name && (
            <p className="text-xs font-semibold text-afri-error">
              ⚠ {errors.name}
            </p>
          )}
        </div>

        {/* Téléphone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
            Téléphone WhatsApp <span className="text-afri-terra">*</span>
          </label>
          <input
            type="tel"
            value={customer.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+225 07 XX XX XX XX"
            inputMode="tel"
            autoComplete="tel"
            className={[
              INPUT_BASE,
              errors.phone ? INPUT_ERROR : customer.phone ? INPUT_OK : "",
            ].join(" ")}
          />
          {errors.phone ? (
            <p className="text-xs font-semibold text-afri-error">
              ⚠ {errors.phone}
            </p>
          ) : (
            <p className="text-xs text-afri-text-3">
              Tu recevras la confirmation et le suivi ici
            </p>
          )}
        </div>

        {/* Adresse */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
            Adresse de livraison <span className="text-afri-terra">*</span>
          </label>
          <textarea
            value={customer.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Quartier, rue, point de repère…"
            rows={3}
            className={[
              "w-full px-3.5 py-3 font-semibold text-sm text-afri-text bg-white",
              "border-2 border-afri-border rounded-xl outline-none resize-none",
              "transition-colors duration-150 placeholder:text-afri-text-3",
              "focus:border-afri-terra",
              errors.address ? INPUT_ERROR : customer.address ? INPUT_OK : "",
            ].join(" ")}
          />
          {errors.address ? (
            <p className="text-xs font-semibold text-afri-error">
              ⚠ {errors.address}
            </p>
          ) : (
            <p className="text-xs text-afri-text-3">
              Zone sélectionnée : {ZONE_LABELS[zone]}
            </p>
          )}
        </div>
      </div>

      {/* Paiement */}
      <div className="flex gap-3 mb-5">
        {[
          { color: "#FF6000", label: "Orange Money" },
          { color: "#1ABCFE", label: "Wave CI" },
        ].map(({ color, label }) => (
          <div
            key={label}
            className="flex-1 bg-white border-2 border-afri-border rounded-xl py-2.5 flex items-center justify-center gap-2"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: color }}
            />
            <span className="text-xs font-extrabold text-afri-text">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={[
          "w-full py-4 text-white font-extrabold text-base rounded-xl border-2 transition-colors duration-150",
          loading
            ? "bg-afri-amber-light border-afri-border text-afri-text-3 cursor-not-allowed"
            : "bg-afri-amber border-afri-amber-dark hover:bg-afri-amber-dark",
        ].join(" ")}
        style={!loading ? { boxShadow: "4px 4px 0 #B07810" } : undefined}
      >
        {loading ? (
          <Loader inline size="sm" message="Traitement en cours…" />
        ) : quote ? (
          `Payer ${formatFcfa(quote.totalFcfa)} →`
        ) : (
          "Confirmer la commande →"
        )}
      </button>

      <p className="text-center text-xs text-afri-text-3 mt-3 font-semibold">
        Orange Money · Wave CI · Sans carte bancaire
      </p>
    </form>
  );
}
