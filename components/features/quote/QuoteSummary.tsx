import {
  QuoteResult,
  DeliveryZone,
  ZONE_LABELS,
  DELIVERY_FEES,
  EXCHANGE_RATE,
} from "@/lib/pricing";
import { formatFcfa } from "@/lib/pricing";

interface Props {
  quote: QuoteResult;
  zone: DeliveryZone;
  priceEur: number;
}

export default function QuoteSummary({ quote, zone, priceEur }: Props) {
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
