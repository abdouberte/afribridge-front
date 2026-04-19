"use client";

import { useState, useMemo, useTransition } from "react";
import { Order, OrderStatus } from "@/lib/types";
import { computeStats } from "@/lib/admin";
import { formatFcfa } from "@/lib/pricing";
// import AdminLogin from "./AdminLogin";
import AdminSidebar, { NavSection } from "./AdminSidebar";
import AdminStats from "./AdminStats";
import AdminTable from "./AdminTable";
import OrderDrawer from "./OrderDrawer";

const KENTE = [
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
];

export default function AdminDashboard({
  orders: initialOrders,
}: {
  orders: Order[];
}) {
  // const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [section, setSection] = useState<NavSection>("orders");
  const [, startTransition] = useTransition();

  const stats = useMemo(() => computeStats(orders), [orders]);

  const filtered = useMemo(() => {
    let list = orders;
    if (filter !== "all") list = list.filter((o) => o.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (o) =>
          o.order_number.toLowerCase().includes(q) ||
          o.customer_name.toLowerCase().includes(q) ||
          o.customer_phone.includes(q) ||
          o.product_url.toLowerCase().includes(q),
      );
    }
    return list.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [orders, filter, search]);

  function handleSaved(updated: Order) {
    startTransition(() => {
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      setSelected(updated);
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  // if (!authed) {
  //   return <AdminLogin onLogin={() => setAuthed(true)} />;
  // }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Kente */}
      <div className="flex h-1.5 shrink-0">
        {KENTE.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      <div
        className="flex flex-1 overflow-hidden"
        style={{ minHeight: "calc(100vh - 6px)" }}
      >
        <AdminSidebar
          section={section}
          onSection={setSection}
          onLogout={handleLogout}
        />

        <main className="flex-1 flex flex-col overflow-hidden bg-afri-cream">
          {/* Topbar */}
          <div className="bg-white border-b-2 border-afri-border px-4 md:px-6 py-3 flex items-center justify-between shrink-0">
            <div>
              <p className="text-base font-black text-afri-text">
                {section === "orders" && "Commandes"}
                {section === "revenue" && "Revenus"}
                {section === "settings" && "Configuration"}
              </p>
              <p className="text-xs font-semibold text-afri-text-3">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <span
              className="text-xs font-extrabold px-3 py-1.5 rounded-xl border-2"
              style={{
                background: stats.pending > 0 ? "#FEF3D0" : "#E0F2EB",
                color: stats.pending > 0 ? "#D4920A" : "#1B7A52",
                borderColor: stats.pending > 0 ? "#F0CC80" : "#A7D7C5",
              }}
            >
              {stats.pending > 0
                ? `${stats.pending} en attente`
                : "Tout traité ✓"}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5">
            {/* ══ COMMANDES ══ */}
            {section === "orders" && (
              <div className="flex flex-col gap-5 max-w-5xl mx-auto">
                <AdminStats stats={stats} variant="orders" />
                <AdminTable
                  orders={filtered}
                  filter={filter}
                  search={search}
                  selected={selected}
                  onFilter={(f) => setFilter(f as OrderStatus | "all")}
                  onSearch={setSearch}
                  onSelect={setSelected}
                />
              </div>
            )}

            {/* ══ REVENUS ══ */}
            {section === "revenue" && (
              <div className="max-w-2xl mx-auto flex flex-col gap-4">
                <AdminStats stats={stats} variant="revenue" />
                <div
                  className="bg-white border-2 border-afri-border rounded-2xl p-5"
                  style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
                >
                  <p className="text-xs font-extrabold text-afri-text-3 uppercase tracking-wider mb-4">
                    5 dernières commandes
                  </p>
                  {orders.slice(0, 5).map((o, i) => (
                    <div
                      key={o.id}
                      className={[
                        "flex items-center justify-between py-2.5",
                        i > 0 ? "border-t border-afri-border" : "",
                      ].join(" ")}
                    >
                      <div>
                        <p className="text-xs font-extrabold text-afri-terra">
                          {o.order_number}
                        </p>
                        <p className="text-xs text-afri-text-3 font-semibold">
                          {o.customer_name}
                        </p>
                      </div>
                      <p className="text-sm font-black text-afri-amber">
                        {formatFcfa(o.total_fcfa)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ CONFIG ══ */}
            {section === "settings" && (
              <div className="max-w-lg mx-auto">
                <div
                  className="bg-white border-2 border-afri-border rounded-2xl p-5"
                  style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
                >
                  <p className="text-sm font-black text-afri-text mb-4">
                    Paramètres MVP
                  </p>
                  {[
                    {
                      label: "Taux de change",
                      value: `${process.env.NEXT_PUBLIC_EXCHANGE_RATE ?? 635} FCFA/€`,
                    },
                    { label: "Commande minimum", value: "80 €" },
                    { label: "Marge < 50 €", value: "15%" },
                    { label: "Marge 50–200 €", value: "18%" },
                    { label: "Marge 200–500 €", value: "15%" },
                    { label: "Marge > 500 €", value: "12%" },
                    { label: "Livraison Abidjan", value: "3 000 FCFA" },
                    { label: "Livraison Intérieur CI", value: "5 000 FCFA" },
                    { label: "Livraison Bamako", value: "8 000 FCFA" },
                  ].map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={[
                        "flex justify-between items-center py-2.5 text-sm",
                        i > 0 ? "border-t border-afri-border" : "",
                      ].join(" ")}
                    >
                      <span className="text-afri-text-3 font-semibold text-xs">
                        {label}
                      </span>
                      <span className="font-extrabold text-afri-text text-xs">
                        {value}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-afri-text-3 font-semibold mt-4 leading-relaxed">
                    Pour modifier ces valeurs, mets à jour les variables dans{" "}
                    <code className="font-mono bg-afri-cream px-1 py-0.5 rounded">
                      .env.local
                    </code>
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Drawer */}
      {selected && (
        <OrderDrawer
          order={selected}
          onClose={() => setSelected(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
