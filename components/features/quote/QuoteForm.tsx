"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  calculateQuote,
  DeliveryZone,
  ZONE_LABELS,
  MIN_ORDER_EUR,
  EXCHANGE_RATE,
  QuoteResult,
  formatFcfa,
} from "@/lib/pricing";
import { useToast } from "@/components/ui/Toast";
import QuoteStepper from "./quote/QuoteStepper";
import StepUrl from "./quote/StepUrl";
import StepQuote from "./quote/StepQuote";
import StepCustomer from "./quote/StepCustomer";

type Step = 1 | 2 | 3;

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

interface Props {
  initialUrl: string;
}

export default function QuoteForm({ initialUrl }: Props) {
  const router = useRouter();
  const toast = useToast();

  /* ── État global ── */
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

  /* ── Devis calculé ── */
  const price = parseFloat(priceEur) || 0;
  const quote: QuoteResult | null =
    price >= 1 ? calculateQuote(price, zone) : null;

  /* ── Validation step 1 ── */
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

  /* ── Validation step 2 ── */
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

  /* ── Validation step 3 ── */
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

  /* ── Navigation ── */
  function goStep2() {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  }

  function goStep3() {
    if (validateStep2()) {
      setErrors({});
      setStep(3);
    }
  }

  /* ── Mise à jour client ── */
  function handleCustomerChange(field: keyof CustomerInfo, value: string) {
    setCustomer((c) => ({ ...c, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  /* ── Soumission ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep3() || !quote) return;
    setLoading(true);
    try {
      // TODO: remplacer par createOrder() quand le backend est prêt
      await new Promise((r) => setTimeout(r, 1000));

      const params = new URLSearchParams({
        ref: "AFR-2025-0001",
        total: quote.totalFcfa.toLocaleString("fr-FR"),
        zone: ZONE_LABELS[zone],
        name: customer.name,
      });
      toast.success(
        "Commande confirmée !",
        "Tu vas recevoir un SMS de confirmation.",
      );
      router.push(`/confirmation?${params.toString()}`);
    } catch {
      toast.error(
        "Une erreur est survenue.",
        "Vérifie ta connexion et réessaie.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-afri-cream font-sans">
      {/* Kente */}
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
      <QuoteStepper step={step} />

      {/* Contenu */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
        {step === 1 && (
          <StepUrl
            url={url}
            error={errors.url}
            onChange={(v) => {
              setUrl(v);
              setErrors({});
            }}
            onNext={goStep2}
          />
        )}
        {step === 2 && (
          <StepQuote
            url={url}
            priceEur={priceEur}
            zone={zone}
            quote={quote}
            error={errors.price}
            onChangePrice={(v) => {
              setPriceEur(v);
              setErrors({});
            }}
            onChangeZone={setZone}
            onChangeUrl={() => {
              setStep(1);
              setErrors({});
            }}
            onNext={goStep3}
          />
        )}
        {step === 3 && (
          <StepCustomer
            customer={customer}
            quote={quote}
            zone={zone}
            loading={loading}
            errors={errors}
            onChange={handleCustomerChange}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
