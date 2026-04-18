"use client";

import { useState, useId, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  calculateQuote,
  formatFcfa,
  DeliveryZone,
  ZONE_LABELS,
  DELIVERY_FEES,
  MIN_ORDER_EUR,
  EXCHANGE_RATE,
  QuoteResult,
} from "@/lib/pricing";

/* ─── Types ─── */
interface Props {
  initialUrl: string;
}

type Step = 1 | 2 | 3;

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

/* ─── Sous-composants UI ─── */
function FieldWrapper({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
        {label}
        {required && <span className="text-afri-terra ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs font-semibold text-afri-error flex items-center gap-1">
          <span aria-hidden>⚠</span> {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-afri-text-3">{hint}</p>}
    </div>
  );
}

const INPUT_BASE =
  "w-full h-11 px-3.5 font-semibold text-sm text-afri-text bg-white " +
  "border-2 border-afri-border rounded-xl outline-none " +
  "transition-colors duration-150 placeholder:text-afri-text-3 " +
  "focus:border-afri-terra";

const INPUT_ERROR = "border-afri-error focus:border-afri-error";
const INPUT_OK = "border-afri-green";

/* ─── Stepper ─── */
function Stepper({ step }: { step: Step }) {
  const steps: { label: string; num: Step }[] = [
    { label: "Lien", num: 1 },
    { label: "Devis", num: 2 },
    { label: "Infos", num: 3 },
  ];
  return (
    <div className="bg-white border-b-2 border-afri-border px-4 py-3">
      <div className="flex items-center max-w-lg mx-auto">
        {steps.map(({ label, num }, i) => {
          const done = step > num;
          const active = step === num;
          return (
            <div key={num} className="flex items-center flex-1 last:flex-none">
              {/* Dot */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={[
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-black",
                    done ? "bg-afri-green text-white" : "",
                    active ? "bg-afri-terra text-white" : "",
                    !done && !active
                      ? "bg-afri-terra-light text-afri-text-3"
                      : "",
                  ].join(" ")}
                >
                  {done ? (
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    num
                  )}
                </div>
                <span
                  className={[
                    "text-[10px] font-bold mt-1",
                    done ? "text-afri-green" : "",
                    active ? "text-afri-terra" : "",
                    !done && !active ? "text-afri-text-3" : "",
                  ].join(" ")}
                >
                  {label}
                </span>
              </div>
              {/* Line */}
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-2 mb-4 rounded"
                  style={{ background: done ? "#1B7A52" : "#E8D0B0" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Carte devis ─── */
function QuoteCard({
  quote,
  zone,
  priceEur,
}: {
  quote: QuoteResult;
  zone: DeliveryZone;
  priceEur: number;
}) {
  return (
    <div
      className="bg-white border-2 border-afri-border rounded-2xl p-4"
      style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-extrabold text-afri-text uppercase tracking-wider">
          Votre devis
        </span>
        <span className="text-xs font-bold text-afri-green bg-afri-green-light px-2 py-0.5 rounded-full">
          Mis à jour
        </span>
      </div>

      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-afri-text-3 font-semibold">
            Produit ({priceEur} € × {EXCHANGE_RATE})
          </span>
          <span className="font-bold text-afri-text">
            {formatFcfa(quote.productFcfa)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-afri-text-3 font-semibold">
            Service ({Math.round(quote.marginRate * 100)}%)
          </span>
          <span className="font-bold text-afri-text">
            +{formatFcfa(quote.marginFcfa)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-afri-text-3 font-semibold">
            Livraison {ZONE_LABELS[zone]}
          </span>
          <span className="font-bold text-afri-text">
            +{formatFcfa(DELIVERY_FEES[zone])}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t-2 border-afri-border">
        <span className="text-xs font-extrabold text-afri-text-3 uppercase tracking-wider">
          Total à payer
        </span>
        <span className="text-2xl font-black text-afri-terra">
          {formatFcfa(quote.totalFcfa)}
        </span>
      </div>
    </div>
  );
}

/* ─── Composant principal ─── */
export default function QuoteForm({ initialUrl }: Props) {
  const router = useRouter();

  /* État global */
  const [step, setStep] = useState<Step>(initialUrl ? 2 : 1);
  const [url, setUrl] = useState(initialUrl);
  const [priceEur, setPriceEur] = useState("");
  const [zone, setZone] = useState<DeliveryZone>("abidjan");
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /* Calcul devis */
  const price = parseFloat(priceEur) || 0;
  const quote = price >= 1 ? calculateQuote(price, zone) : null;

  /* ── STEP 1 : Lien ── */
  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    const trimmed = url.trim();
    if (!trimmed) {
      e.url = "Colle un lien produit pour continuer.";
    } else {
      try {
        new URL(trimmed);
      } catch {
        e.url = "Ce lien ne semble pas valide.";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goStep2() {
    if (validateStep1()) setStep(2);
  }

  /* ── STEP 2 : Prix & zone ── */
  function validateStep2(): boolean {
    const e: Record<string, string> = {};
    if (!priceEur || price <= 0) {
      e.price = "Saisis le prix du produit.";
    } else if (price < MIN_ORDER_EUR) {
      e.price = `Commande minimum ${MIN_ORDER_EUR} € (${formatFcfa(MIN_ORDER_EUR * EXCHANGE_RATE)}).`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goStep3() {
    if (validateStep2()) setStep(3);
  }

  /* ── STEP 3 : Infos client ── */
  function validateStep3(): boolean {
    const e: Record<string, string> = {};
    if (!customer.name.trim()) {
      e.name = "Ton nom est requis.";
    }
    if (!customer.phone.trim()) {
      e.phone = "Ton numéro WhatsApp est requis.";
    } else if (!/^\+\d{10,15}$/.test(customer.phone.replace(/\s/g, ""))) {
      e.phone = "Format attendu : +225 07 XX XX XX XX";
    }
    if (!customer.address.trim()) {
      e.address = "L'adresse de livraison est requise.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep3() || !quote) return;
    setLoading(true);
    try {
      // TODO: appel POST /api/orders via lib/api.ts
      // const order = await createOrder({ ... })
      // router.push(`/suivi?ref=${order.order_number}`)
      await new Promise((r) => setTimeout(r, 1000)); // stub
      router.push("/suivi");
    } catch {
      setErrors({ submit: "Une erreur est survenue. Réessaie." });
    } finally {
      setLoading(false);
    }
  }

  /* ── URL recap bar ── */
  const UrlRecap = (
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
        <p className="text-xs font-semibold text-afri-text-2 truncate">{url}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          setStep(1);
          setErrors({});
        }}
        className="text-xs font-extrabold text-afri-terra shrink-0 hover:underline"
      >
        Changer
      </button>
    </div>
  );

  /* ── Render ── */
  return (
    <div className="min-h-screen bg-afri-cream font-sans">
      {/* Bande Kente */}
      <div className="flex h-1.5">
        {[
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
        ].map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      {/* Nav */}
      <nav className="bg-white border-b-2 border-afri-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              step > 1 ? setStep((step - 1) as Step) : router.push("/")
            }
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
            Retour
          </button>
          <span className="text-base font-black text-afri-text">
            Afri<span className="text-afri-terra">Bridge</span>
          </span>
          <div className="w-14" />
        </div>
      </nav>

      {/* Stepper */}
      <Stepper step={step} />

      {/* Contenu */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
        {/* ══ STEP 1 ══ */}
        {step === 1 && (
          <div>
            <h1 className="text-xl font-black text-afri-text mb-1">
              Colle le lien du produit
            </h1>
            <p className="text-sm text-afri-text-3 font-semibold mb-6 leading-relaxed">
              Amazon, AliExpress, Zara, eBay… n'importe quelle boutique en
              ligne.
            </p>

            <FieldWrapper label="Lien du produit" required error={errors.url}>
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setErrors({});
                }}
                placeholder="https://amazon.fr/…  · aliexpress.com/…"
                className={[INPUT_BASE, errors.url ? INPUT_ERROR : ""].join(
                  " ",
                )}
                inputMode="url"
                autoComplete="off"
                autoCapitalize="none"
              />
            </FieldWrapper>

            {/* Sites supportés */}
            <div className="mt-5 mb-8">
              <p className="text-xs font-extrabold text-afri-text-3 uppercase tracking-wider mb-3">
                Sites compatibles
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Amazon",
                  "AliExpress",
                  "eBay",
                  "Zara",
                  "ASOS",
                  "IKEA",
                  "Nike",
                  "Cdiscount",
                  "+ tout site",
                ].map((s) => (
                  <span
                    key={s}
                    className="bg-white border-2 border-afri-border rounded-lg px-3 py-1 text-xs font-extrabold text-afri-text"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={goStep2}
              className="w-full py-4 bg-afri-terra text-white font-extrabold text-base rounded-xl border-2 border-afri-terra-dark hover:bg-afri-terra-dark transition-colors"
              style={{ boxShadow: "3px 3px 0 #A8481A" }}
            >
              Continuer → Prix &amp; devis
            </button>
          </div>
        )}

        {/* ══ STEP 2 ══ */}
        {step === 2 && (
          <div>
            <h1 className="text-xl font-black text-afri-text mb-1">
              Prix &amp; zone de livraison
            </h1>
            <p className="text-sm text-afri-text-3 font-semibold mb-5 leading-relaxed">
              Ton devis se calcule automatiquement.
            </p>

            {UrlRecap}

            <div className="flex flex-col gap-5 mb-6">
              {/* Prix */}
              <FieldWrapper
                label="Prix du produit"
                required
                error={errors.price}
                hint={`Minimum ${MIN_ORDER_EUR} € · Taux bloqué ${EXCHANGE_RATE} FCFA/€`}
              >
                <div
                  className={[
                    "flex border-2 rounded-xl overflow-hidden bg-white",
                    errors.price
                      ? "border-afri-error"
                      : "border-afri-border focus-within:border-afri-terra",
                  ].join(" ")}
                  style={{ transition: "border-color 0.15s" }}
                >
                  <input
                    type="number"
                    value={priceEur}
                    onChange={(e) => {
                      setPriceEur(e.target.value);
                      setErrors({});
                    }}
                    placeholder="0"
                    min={0}
                    step="0.01"
                    className="flex-1 h-11 px-3.5 bg-transparent outline-none font-extrabold text-lg text-afri-text placeholder:text-afri-text-3 placeholder:font-semibold placeholder:text-sm"
                  />
                  <div className="flex items-center px-4 bg-afri-cream border-l-2 border-afri-border text-sm font-extrabold text-afri-terra shrink-0">
                    EUR €
                  </div>
                </div>
              </FieldWrapper>

              {/* Zone */}
              <FieldWrapper label="Zone de livraison" required>
                <div className="flex gap-2">
                  {(Object.keys(ZONE_LABELS) as DeliveryZone[]).map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setZone(z)}
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
              </FieldWrapper>
            </div>

            {/* Devis live */}
            {quote ? (
              <div className="mb-6">
                <QuoteCard quote={quote} zone={zone} priceEur={price} />
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
              onClick={goStep3}
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
        )}

        {/* ══ STEP 3 ══ */}
        {step === 3 && (
          <form onSubmit={handleSubmit} noValidate>
            <h1 className="text-xl font-black text-afri-text mb-1">
              Vos informations
            </h1>
            <p className="text-sm text-afri-text-3 font-semibold mb-5 leading-relaxed">
              Pour la livraison et la confirmation par SMS/WhatsApp.
            </p>

            {/* Recap devis compact */}
            {quote && (
              <div className="flex items-center justify-between bg-afri-hero rounded-xl px-4 py-3 mb-6">
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
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-white/40 hover:text-white/70 transition-colors"
                >
                  Modifier
                </button>
              </div>
            )}

            <div className="flex flex-col gap-5 mb-6">
              {/* Nom */}
              <FieldWrapper label="Nom complet" required error={errors.name}>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => {
                    setCustomer((c) => ({ ...c, name: e.target.value }));
                    setErrors((err) => ({ ...err, name: "" }));
                  }}
                  placeholder="Ex : Koné Mamadou"
                  className={[
                    INPUT_BASE,
                    errors.name ? INPUT_ERROR : customer.name ? INPUT_OK : "",
                  ].join(" ")}
                  autoComplete="name"
                />
              </FieldWrapper>

              {/* Téléphone */}
              <FieldWrapper
                label="Téléphone WhatsApp"
                required
                error={errors.phone}
                hint="Tu recevras la confirmation et le suivi ici"
              >
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => {
                    setCustomer((c) => ({ ...c, phone: e.target.value }));
                    setErrors((err) => ({ ...err, phone: "" }));
                  }}
                  placeholder="+225 07 XX XX XX XX"
                  className={[
                    INPUT_BASE,
                    errors.phone ? INPUT_ERROR : customer.phone ? INPUT_OK : "",
                  ].join(" ")}
                  inputMode="tel"
                  autoComplete="tel"
                />
              </FieldWrapper>

              {/* Adresse */}
              <FieldWrapper
                label="Adresse de livraison"
                required
                error={errors.address}
                hint={`Zone sélectionnée : ${ZONE_LABELS[zone]}`}
              >
                <textarea
                  value={customer.address}
                  onChange={(e) => {
                    setCustomer((c) => ({ ...c, address: e.target.value }));
                    setErrors((err) => ({ ...err, address: "" }));
                  }}
                  placeholder="Quartier, rue, point de repère…"
                  rows={3}
                  className={[
                    "w-full px-3.5 py-3 font-semibold text-sm text-afri-text bg-white",
                    "border-2 border-afri-border rounded-xl outline-none resize-none",
                    "transition-colors duration-150 placeholder:text-afri-text-3",
                    "focus:border-afri-terra",
                    errors.address
                      ? INPUT_ERROR
                      : customer.address
                        ? INPUT_OK
                        : "",
                  ].join(" ")}
                />
              </FieldWrapper>
            </div>

            {/* Erreur globale */}
            {errors.submit && (
              <div className="bg-afri-error-light border-2 border-afri-error rounded-xl px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-afri-error">
                  ⚠ {errors.submit}
                </p>
              </div>
            )}

            {/* Paiement info */}
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
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-afri-text-3 animate-blink [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-afri-text-3 animate-blink [animation-delay:200ms]" />
                  <span className="w-2 h-2 rounded-full bg-afri-text-3 animate-blink [animation-delay:400ms]" />
                  Traitement en cours…
                </span>
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
        )}
      </div>
    </div>
  );
}
