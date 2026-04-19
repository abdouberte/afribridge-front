import { Order } from "@/lib/types";
import { ZONE_LABELS } from "@/lib/types";
import StatusCard from "./StatusCard";
import OrderInfo from "./OrderInfo";

interface Props {
  order: Order;
}

export default function OrderTimeline({ order }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Statut */}
      <StatusCard
        status={order.status}
        zone={ZONE_LABELS[order.delivery_zone]}
      />

      {/* Infos commande */}
      <OrderInfo order={order} />

      {/* Tracking */}
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

      {/* Aide WhatsApp */}
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
