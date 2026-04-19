"use client";

import { Order } from "@/lib/types";
import { formatFcfa } from "@/lib/pricing";
import { FILTER_OPTIONS } from "@/lib/admin";
import { ZONE_LABELS } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface Props {
  orders: Order[];
  filter: string;
  search: string;
  selected: Order | null;
  onFilter: (f: string) => void;
  onSearch: (s: string) => void;
  onSelect: (o: Order) => void;
}

export default function AdminTable({
  orders,
  filter,
  search,
  selected,
  onFilter,
  onSearch,
  onSelect,
}: Props) {
  const totalVisible = orders.reduce((s, o) => s + o.total_fcfa, 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="flex border-2 border-afri-border rounded-xl overflow-hidden bg-white focus-within:border-afri-terra transition-colors">
        <div className="flex items-center px-3 text-afri-text-3">
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Rechercher une commande, un client, un téléphone…"
          className="flex-1 h-10 bg-transparent outline-none text-sm font-semibold text-afri-text placeholder:text-afri-text-3"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="px-3 text-afri-text-3 hover:text-afri-text transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilter(value)}
            className={[
              "shrink-0 px-3 py-1.5 rounded-full border-2 text-xs font-extrabold transition-colors duration-150",
              filter === value
                ? "bg-afri-terra-light border-afri-terra text-afri-terra"
                : "bg-white border-afri-border text-afri-text-3 hover:border-afri-terra hover:text-afri-terra",
            ].join(" ")}
          >
            {label}
            {value !== "all" && (
              <span className="ml-1.5 font-black">
                {orders.filter((o) => o.status === value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div
        className="bg-white border-2 border-afri-border rounded-2xl overflow-hidden"
        style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
      >
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1.5fr_1fr_1.2fr_auto] gap-3 px-4 py-2.5 bg-afri-terra-light border-b border-afri-border">
          {["Réf.", "Produit", "Client", "Montant", "Statut", ""].map((h) => (
            <span
              key={h}
              className="text-xs font-extrabold text-afri-terra uppercase tracking-wider"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {orders.length === 0 ? (
          <div className="flex items-center justify-center py-14">
            <p className="text-sm font-bold text-afri-text-3">
              Aucune commande trouvée.
            </p>
          </div>
        ) : (
          orders.map((order, i) => (
            <div
              key={order.id}
              onClick={() => onSelect(order)}
              className={[
                "flex md:grid md:grid-cols-[1fr_2fr_1.5fr_1fr_1.2fr_auto]",
                "gap-2 md:gap-3 px-4 py-3.5 items-center cursor-pointer",
                "transition-colors duration-150 hover:bg-afri-cream",
                i > 0 ? "border-t border-afri-border" : "",
                selected?.id === order.id ? "bg-afri-terra-light" : "",
              ].join(" ")}
            >
              <div>
                <p className="text-xs font-extrabold text-afri-terra">
                  {order.order_number}
                </p>
                <p className="text-xs text-afri-text-3 font-semibold mt-0.5">
                  {new Date(order.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </p>
              </div>
              <p className="hidden md:block text-sm font-bold text-afri-text truncate">
                {new URL(order.product_url).hostname}
              </p>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-afri-text">
                  {order.customer_name}
                </p>
                <p className="text-xs text-afri-text-3 font-semibold mt-0.5">
                  {ZONE_LABELS[order.delivery_zone]}
                </p>
              </div>
              <p className="text-sm font-black text-afri-amber whitespace-nowrap">
                {formatFcfa(order.total_fcfa)}
              </p>
              <Badge status={order.status} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(order);
                }}
                className="text-xs font-bold text-afri-text-3 hover:text-afri-terra transition-colors hidden md:block"
              >
                Gérer →
              </button>
            </div>
          ))
        )}

        {/* Footer */}
        {orders.length > 0 && (
          <div className="px-4 py-2.5 border-t-2 border-afri-border bg-afri-cream flex items-center justify-between">
            <p className="text-xs font-semibold text-afri-text-3">
              {orders.length} commande{orders.length > 1 ? "s" : ""}
            </p>
            <p className="text-xs font-extrabold text-afri-amber">
              Total : {formatFcfa(totalVisible)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
