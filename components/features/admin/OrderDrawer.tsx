"use client";

import { useState } from "react";
import {
  Order,
  OrderStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  ZONE_LABELS,
} from "@/lib/types";
import { formatFcfa } from "@/lib/pricing";
import { STATUS_OPTIONS } from "@/lib/admin";
import { updateOrder } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";

interface Props {
  order: Order;
  onClose: () => void;
  onSaved: (updated: Order) => void;
}

export default function OrderDrawer({ order, onClose, onSaved }: Props) {
  const toast = useToast();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [notes, setNotes] = useState(order.notes ?? "");
  const [saving, setSaving] = useState(false);

  const colors = STATUS_COLORS[status];

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await updateOrder(order.id, {
        status,
        tracking_number: tracking || null,
        notes: notes || null,
      });
      onSaved(updated);
      toast.success(
        "Commande mise à jour",
        `${order.order_number} → ${STATUS_LABELS[status]}`,
      );
    } catch {
      toast.error(
        "Erreur de sauvegarde",
        "Impossible de contacter le serveur. Réessaie.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(28,14,6,0.55)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md h-full bg-white overflow-y-auto flex flex-col border-l-2 border-afri-border">
        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-afri-border flex items-start justify-between sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs font-extrabold text-afri-terra uppercase tracking-wider">
              {order.order_number}
            </p>
            <p className="text-base font-black text-afri-text mt-0.5">
              {order.customer_name}
            </p>
            <p className="text-xs font-semibold text-afri-text-3">
              {new Date(order.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-afri-text-3 hover:text-afri-text transition-colors p-1"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-5 px-5 py-5 flex-1">
          {/* Produit */}
          <div className="bg-afri-terra-light border border-afri-border rounded-xl p-3 flex items-start gap-3">
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
                Lien produit
              </p>
              <a
                href={order.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-afri-text-2 underline block truncate"
              >
                {order.product_url}
              </a>
            </div>
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-0 border-2 border-afri-border rounded-xl overflow-hidden">
            {[
              { label: "Téléphone", value: order.customer_phone },
              { label: "Zone", value: ZONE_LABELS[order.delivery_zone] },
              { label: "Adresse", value: order.delivery_address },
              {
                label: "Prix produit",
                value: `${order.product_price_eur} € · ${formatFcfa(Math.round(order.product_price_eur * order.exchange_rate))}`,
              },
              { label: "Taux bloqué", value: `${order.exchange_rate} FCFA/€` },
              {
                label: "Total encaissé",
                value: formatFcfa(order.total_fcfa),
                highlight: true,
              },
              ...(order.payment_ref
                ? [{ label: "Réf. paiement", value: order.payment_ref }]
                : []),
            ].map(({ label, value, highlight }, i) => (
              <div
                key={label}
                className={[
                  "flex justify-between items-center px-4 py-2.5",
                  i > 0 ? "border-t border-afri-border" : "",
                  highlight ? "bg-afri-amber-light" : "",
                ].join(" ")}
              >
                <span className="text-xs font-semibold text-afri-text-3">
                  {label}
                </span>
                <span
                  className={[
                    "font-bold text-xs text-right max-w-[55%]",
                    highlight
                      ? "text-afri-amber text-sm font-black"
                      : "text-afri-text",
                  ].join(" ")}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Statut */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
              Statut de la commande
            </label>
            <div className="flex flex-col gap-2">
              {STATUS_OPTIONS.map(([val, label]) => {
                const c = STATUS_COLORS[val];
                const selected = status === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setStatus(val)}
                    className={[
                      "flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-150",
                      selected
                        ? "border-current"
                        : "border-afri-border bg-white hover:bg-afri-cream",
                    ].join(" ")}
                    style={
                      selected
                        ? {
                            background: c.bg,
                            borderColor: c.border,
                            color: c.text,
                          }
                        : undefined
                    }
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: selected ? c.icon : "#E8D0B0" }}
                    />
                    <span
                      className={[
                        "text-sm font-extrabold flex-1",
                        selected ? "" : "text-afri-text-3",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                    {selected && (
                      <svg
                        width="14"
                        height="14"
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
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tracking */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
              Numéro de tracking
            </label>
            <input
              type="text"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="Ex : TF-2025-88421"
              className="h-11 px-4 border-2 border-afri-border rounded-xl outline-none text-sm font-semibold text-afri-text bg-afri-cream placeholder:text-afri-text-3 focus:border-afri-terra transition-colors"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
              Notes internes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes visibles uniquement par toi…"
              rows={3}
              className="px-4 py-3 border-2 border-afri-border rounded-xl outline-none text-sm font-semibold text-afri-text bg-afri-cream placeholder:text-afri-text-3 focus:border-afri-terra transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer sticky */}
        <div className="px-5 py-4 border-t-2 border-afri-border sticky bottom-0 bg-white">
          <button
            onClick={handleSave}
            disabled={saving}
            className={[
              "w-full py-3.5 font-extrabold text-sm rounded-xl border-2 transition-colors duration-150",
              saving
                ? "bg-afri-green-light border-afri-border text-afri-text-3 cursor-not-allowed"
                : "bg-afri-green text-white border-afri-green-dark hover:bg-afri-green-dark",
            ].join(" ")}
            style={!saving ? { boxShadow: "3px 3px 0 #155E3F" } : undefined}
          >
            {saving ? "Enregistrement…" : "Enregistrer les modifications →"}
          </button>
        </div>
      </div>
    </div>
  );
}
