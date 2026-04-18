import {
  Order,
  OrderStatus,
  STATUS_STEPS,
  STATUS_LABELS,
  STATUS_COLORS,
  STATUS_ICONS,
  ZONE_LABELS,
} from "@/lib/types";
import { formatFcfa } from "@/lib/pricing";

interface Props {
  order: Order;
}

/* ── Barre de progression mini ── */
function MiniProgress({ status }: { status: OrderStatus }) {
  const current = STATUS_STEPS.indexOf(status);

  return (
    <div>
      {/* Dots + lignes */}
      <div className="flex items-center mt-4">
        {STATUS_STEPS.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background:
                    done || active ? (done ? "#1B7A52" : "#C85A1E") : "#F0E4D0",
                  border: `2px solid ${done ? "#1B7A52" : active ? "#C85A1E" : "#E8D0B0"}`,
                }}
              >
                {done ? (
                  <svg
                    width="8"
                    height="8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span
                    className="text-[8px] font-black"
                    style={{ color: active ? "white" : "#B89070" }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-0.5"
                  style={{ background: done ? "#1B7A52" : "#E8D0B0" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1.5">
        {STATUS_STEPS.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const shortLabels: Record<OrderStatus, string> = {
            pending: "Reçue",
            paid: "Payé",
            purchased: "Acheté",
            shipped: "Transit",
            delivered: "Livré",
          };
          return (
            <span
              key={s}
              className="text-[8px] font-bold flex-1 text-center"
              style={{
                color: done ? "#1B7A52" : active ? "#C85A1E" : "#B89070",
                fontWeight: active ? 800 : 700,
              }}
            >
              {shortLabels[s]}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── Composant principal ── */
export default function OrderTimeline({ order }: Props) {
  const colors = STATUS_COLORS[order.status];

  return (
    <div className="flex flex-col gap-4">
      {/* ── Carte statut central ── */}
      <div
        className="bg-white border-2 rounded-2xl p-5 text-center"
        style={{
          borderColor: colors.border,
          boxShadow: `3px 3px 0 ${colors.border}`,
        }}
      >
        {/* Icône */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: colors.bg }}
        >
          <svg
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 24 24"
            stroke={colors.icon}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={STATUS_ICONS[order.status]} />
          </svg>
        </div>

        {/* Badge statut */}
        <span
          className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full border-2 mb-3"
          style={{
            background: colors.bg,
            color: colors.text,
            borderColor: colors.border,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: colors.icon }}
          />
          {STATUS_LABELS[order.status]}
        </span>

        {/* Message contextuel */}
        <p className="text-sm font-extrabold text-afri-text mb-1">
          {order.status === "pending" && "Commande bien reçue !"}
          {order.status === "paid" && "Paiement confirmé !"}
          {order.status === "purchased" && "Produit acheté, en préparation."}
          {order.status === "shipped" && "Ton colis est en route ✈"}
          {order.status === "delivered" && "Colis livré, profite bien ! 🎉"}
        </p>
        <p className="text-xs font-semibold text-afri-text-3 leading-relaxed">
          {order.status === "pending" &&
            "Nous traitons ta commande. Tu seras contacté sous 24h."}
          {order.status === "paid" &&
            "On s'occupe d'acheter ton produit maintenant."}
          {order.status === "purchased" &&
            "Le produit sera remis au groupagiste très prochainement."}
          {order.status === "shipped" &&
            `Arrivée prévue à ${ZONE_LABELS[order.delivery_zone]} sous 2 semaines.`}
          {order.status === "delivered" &&
            "Merci de ta confiance. Commande à nouveau quand tu veux !"}
        </p>

        {/* Mini barre de progression */}
        <MiniProgress status={order.status} />
      </div>

      {/* ── Infos commande ── */}
      <div
        className="bg-white border-2 border-afri-border rounded-2xl overflow-hidden"
        style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b-2 border-afri-border flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold text-afri-terra tracking-wider uppercase">
              {order.order_number}
            </p>
            <p className="text-xs font-semibold text-afri-text-3 mt-0.5">
              {new Date(order.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <p className="text-lg font-black text-afri-amber">
            {formatFcfa(order.total_fcfa)}
          </p>
        </div>

        {/* Rows */}
        <div className="px-4 py-3 flex flex-col gap-2">
          {[
            { label: "Produit", value: new URL(order.product_url).hostname },
            { label: "Zone", value: ZONE_LABELS[order.delivery_zone] },
            { label: "Livraison", value: order.delivery_address },
            { label: "Client", value: order.customer_name },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-start gap-4">
              <span className="text-xs font-semibold text-afri-text-3 shrink-0">
                {label}
              </span>
              <span className="text-xs font-bold text-afri-text text-right truncate max-w-[60%]">
                {value}
              </span>
            </div>
          ))}

          {/* Lien produit */}
          <div className="flex justify-between items-center gap-4 pt-1 border-t border-afri-border">
            <span className="text-xs font-semibold text-afri-text-3 shrink-0">
              Lien
            </span>
            <a
              href={order.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-afri-terra underline truncate max-w-[60%]"
            >
              Voir le produit →
            </a>
          </div>
        </div>
      </div>

      {/* ── Numéro de tracking ── */}
      {order.tracking_number && (
        <div
          className="flex items-center gap-3 bg-afri-amber-light border-2 rounded-xl px-4 py-3"
          style={{ borderColor: "#F0CC80", boxShadow: "3px 3px 0 #F0CC80" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "#D4920A" }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-extrabold text-afri-amber uppercase tracking-wider mb-0.5">
              Numéro de tracking
            </p>
            <p className="text-base font-black text-afri-text">
              {order.tracking_number}
            </p>
          </div>
        </div>
      )}

      {/* ── Aide WhatsApp ── */}
      <div
        className="flex items-center justify-between gap-4 bg-afri-terra-light border-2 rounded-xl px-4 py-3"
        style={{ borderColor: "#F0C8A0" }}
      >
        <p className="text-xs font-bold text-afri-text-2 leading-relaxed">
          Un problème avec ta commande ?<br />
          On te répond sur WhatsApp.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Bonjour, ma commande ${order.order_number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 bg-afri-terra text-white text-xs font-extrabold rounded-xl border-2 border-afri-terra-dark whitespace-nowrap"
          style={{ boxShadow: "2px 2px 0 #A8481A" }}
        >
          WhatsApp →
        </a>
      </div>
    </div>
  );
}
