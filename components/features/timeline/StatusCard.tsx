import {
  OrderStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  STATUS_ICONS,
} from "@/lib/types";
import MiniProgress from "./MiniProgress";

interface Props {
  status: OrderStatus;
  zone: string;
}

const STATUS_MESSAGE: Record<OrderStatus, string> = {
  pending: "Commande bien reçue !",
  paid: "Paiement confirmé !",
  purchased: "Produit acheté, en préparation.",
  shipped: "Ton colis est en route ✈",
  delivered: "Colis livré, profite bien ! 🎉",
};

const STATUS_SUB: (zone: string) => Record<OrderStatus, string> = (zone) => ({
  pending: "Nous traitons ta commande. Tu seras contacté sous 24h.",
  paid: "On s'occupe d'acheter ton produit maintenant.",
  purchased: "Le produit sera remis au groupagiste très prochainement.",
  shipped: `Arrivée prévue à ${zone} sous 2 semaines.`,
  delivered: "Merci de ta confiance. Commande à nouveau quand tu veux !",
});

export default function StatusCard({ status, zone }: Props) {
  const colors = STATUS_COLORS[status];

  return (
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
          <path d={STATUS_ICONS[status]} />
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
        {STATUS_LABELS[status]}
      </span>

      {/* Message */}
      <p className="text-sm font-extrabold text-afri-text mb-1">
        {STATUS_MESSAGE[status]}
      </p>
      <p className="text-xs font-semibold text-afri-text-3 leading-relaxed">
        {STATUS_SUB(zone)[status]}
      </p>

      {/* Mini barre */}
      <MiniProgress status={status} />
    </div>
  );
}
