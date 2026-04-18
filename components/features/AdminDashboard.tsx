"use client";

import { useState, useMemo, useTransition } from "react";
import {
  Order,
  OrderStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  ZONE_LABELS,
} from "@/lib/types";
import { formatFcfa } from "@/lib/pricing";
import {
  computeStats,
  FILTER_OPTIONS,
  STATUS_OPTIONS,
  // ADMIN_PASSWORD,
} from "@/lib/admin";
import { updateOrder } from "@/lib/api";
import Badge from "@/components/ui/Badge";

/* ─── Login screen ─── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) {
        setError(true);
        return;
      }
      onLogin();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-afri-hero flex items-center justify-center px-4">
      <div
        className="bg-white border-2 border-afri-border rounded-2xl p-8 w-full max-w-sm"
        style={{ boxShadow: "6px 6px 0 #E8D0B0" }}
      >
        <p className="text-xl font-black text-afri-text mb-1">
          Afri<span className="text-afri-terra">Bridge</span>
        </p>
        <p className="text-xs font-bold text-afri-text-3 uppercase tracking-wider mb-6">
          Accès administration
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
              Mot de passe
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className={[
                "h-11 px-4 border-2 rounded-xl outline-none text-sm font-semibold",
                "bg-afri-cream text-afri-text placeholder:text-afri-text-3",
                "transition-colors duration-150",
                error
                  ? "border-afri-error focus:border-afri-error"
                  : "border-afri-border focus:border-afri-terra",
              ].join(" ")}
              autoComplete="current-password"
              disabled={loading}
            />
            {error && (
              <p className="text-xs font-semibold text-afri-error">
                ⚠ Mot de passe incorrect.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={[
              "h-11 text-white font-extrabold text-sm rounded-xl border-2 transition-colors duration-150",
              loading
                ? "bg-afri-terra-light border-afri-border text-afri-text-3 cursor-not-allowed"
                : "bg-afri-terra border-afri-terra-dark hover:bg-afri-terra-dark",
            ].join(" ")}
            style={!loading ? { boxShadow: "3px 3px 0 #A8481A" } : undefined}
          >
            {loading ? "Vérification…" : "Accéder au back-office →"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── KPI Card ─── */
function KpiCard({
  num,
  label,
  color = "terra",
}: {
  num: string | number;
  label: string;
  color?: "terra" | "amber" | "green" | "neutral";
}) {
  const textColor = {
    terra: "text-afri-terra",
    amber: "text-afri-amber",
    green: "text-afri-green",
    neutral: "text-afri-text",
  }[color];

  return (
    <div
      className="bg-white border-2 border-afri-border rounded-xl p-3 flex flex-col gap-0.5"
      style={{ boxShadow: "2px 2px 0 #E8D0B0" }}
    >
      <p className={`text-lg font-black ${textColor}`}>{num}</p>
      <p className="text-xs font-bold text-afri-text-3 leading-tight">
        {label}
      </p>
    </div>
  );
}

/* ─── Drawer détail commande ─── */
function OrderDrawer({
  order,
  onClose,
  onSaved,
}: {
  order: Order;
  onClose: () => void;
  onSaved: (updated: Order) => void;
}) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [notes, setNotes] = useState(order.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const updated = await updateOrder(order.id, {
        status,
        tracking_number: tracking || null,
        notes: notes || null,
      });
      onSaved(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setError("Erreur lors de la sauvegarde. Réessaie.");
    } finally {
      setSaving(false);
    }
  }

  const colors = STATUS_COLORS[status];

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(28,14,6,0.55)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
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

          {/* Infos commande */}
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
                  "flex justify-between items-center px-4 py-2.5 text-sm",
                  i > 0 ? "border-t border-afri-border" : "",
                  highlight ? "bg-afri-amber-light" : "",
                ].join(" ")}
              >
                <span className="text-afri-text-3 font-semibold text-xs">
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

          {/* Erreur / succès */}
          {error && (
            <p className="text-xs font-semibold text-afri-error">⚠ {error}</p>
          )}
          {success && (
            <p className="text-xs font-semibold text-afri-green flex items-center gap-1">
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
              Commande mise à jour.
            </p>
          )}
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

/* ─── Nav item sidebar ─── */
type NavSection = "orders" | "revenue" | "settings";

function NavItem({
  icon,
  label,
  section,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  section: NavSection;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left",
        "text-sm font-bold transition-colors duration-150",
        active
          ? "bg-afri-terra/20 text-afri-terra"
          : "text-white/40 hover:text-white/70 hover:bg-white/5",
      ].join(" ")}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

/* ─── Dashboard principal ─── */
export default function AdminDashboard({
  orders: initialOrders,
}: {
  orders: Order[];
}) {
  const [authed, setAuthed] = useState(
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem("afri_admin") === "1",
  );
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

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

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

  /* ── ICÔNES SIDEBAR ── */
  const SIDEBAR_NAV: {
    section: NavSection;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      section: "orders",
      label: "Commandes",
      icon: (
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
          />
        </svg>
      ),
    },
    {
      section: "revenue",
      label: "Revenus",
      icon: (
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      section: "settings",
      label: "Config",
      icon: (
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* ── Kente ── */}
      <div className="flex h-1.5 shrink-0">
        {KENTE.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      <div
        className="flex flex-1 overflow-hidden"
        style={{ minHeight: "calc(100vh - 6px)" }}
      >
        {/* ── SIDEBAR ── */}
        <aside
          className="flex flex-col shrink-0 px-2 py-4 gap-1"
          style={{
            background: "#1C0E06",
            width: "clamp(64px, 15vw, 220px)",
            minWidth: "64px",
          }}
          // Desktop : sidebar élargie
          /* md: width 180px via inline pour compatibilité */
        >
          {/* Logo */}
          <div className="px-2 pb-4 mb-1 border-b border-white/10">
            <p className="text-sm font-black text-white">
              A<span className="text-afri-terra">B</span>
            </p>
          </div>

          {/* Nav */}
          {SIDEBAR_NAV.map(({ section: s, label, icon }) => (
            <NavItem
              key={s}
              section={s}
              label={label}
              icon={icon}
              active={section === s}
              onClick={() => setSection(s)}
            />
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              sessionStorage.removeItem("afri_admin");
              setAuthed(false);
            }}
            className="mt-auto flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/60 transition-colors text-sm font-bold"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </aside>

        {/* ── MAIN ── */}
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
            {/* ══ SECTION COMMANDES ══ */}
            {section === "orders" && (
              <div className="flex flex-col gap-5 max-w-5xl mx-auto">
                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <KpiCard
                    num={stats.pending}
                    label="En attente"
                    color="terra"
                  />
                  <KpiCard
                    num={stats.inProgress}
                    label="En cours"
                    color="amber"
                  />
                  <KpiCard
                    num={stats.delivered}
                    label="Livrées"
                    color="green"
                  />
                  <KpiCard
                    num={formatFcfa(stats.totalToday)}
                    label="FCFA aujourd'hui"
                    color="neutral"
                  />
                </div>

                {/* Search + filtres */}
                <div className="flex flex-col gap-3">
                  {/* Barre de recherche */}
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
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Rechercher une commande, un client, un téléphone…"
                      className="flex-1 h-10 bg-transparent outline-none text-sm font-semibold text-afri-text placeholder:text-afri-text-3"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
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

                  {/* Filtres statut */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {FILTER_OPTIONS.map(({ label, value }) => (
                      <button
                        key={value}
                        onClick={() => setFilter(value)}
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
                </div>

                {/* Tableau */}
                <div
                  className="bg-white border-2 border-afri-border rounded-2xl overflow-hidden"
                  style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
                >
                  {/* Header tableau */}
                  <div className="hidden md:grid grid-cols-[1fr_2fr_1.5fr_1fr_1.2fr_auto] gap-3 px-4 py-2.5 bg-afri-terra-light border-b border-afri-border">
                    {["Réf.", "Produit", "Client", "Montant", "Statut", ""].map(
                      (h) => (
                        <span
                          key={h}
                          className="text-xs font-extrabold text-afri-terra uppercase tracking-wider"
                        >
                          {h}
                        </span>
                      ),
                    )}
                  </div>

                  {/* Rows */}
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-14 text-center">
                      <p className="text-sm font-bold text-afri-text-3">
                        Aucune commande trouvée.
                      </p>
                    </div>
                  ) : (
                    filtered.map((order, i) => (
                      <div
                        key={order.id}
                        onClick={() => setSelected(order)}
                        className={[
                          "flex md:grid md:grid-cols-[1fr_2fr_1.5fr_1fr_1.2fr_auto]",
                          "gap-2 md:gap-3 px-4 py-3.5 items-center cursor-pointer",
                          "transition-colors duration-150 hover:bg-afri-cream",
                          i > 0 ? "border-t border-afri-border" : "",
                          selected?.id === order.id
                            ? "bg-afri-terra-light"
                            : "",
                        ].join(" ")}
                      >
                        {/* Réf */}
                        <div>
                          <p className="text-xs font-extrabold text-afri-terra">
                            {order.order_number}
                          </p>
                          <p className="text-xs text-afri-text-3 font-semibold mt-0.5">
                            {new Date(order.created_at).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "2-digit",
                              },
                            )}
                          </p>
                        </div>

                        {/* Produit */}
                        <p className="hidden md:block text-sm font-bold text-afri-text truncate">
                          {new URL(order.product_url).hostname}
                        </p>

                        {/* Client */}
                        <div className="hidden md:block">
                          <p className="text-sm font-bold text-afri-text">
                            {order.customer_name}
                          </p>
                          <p className="text-xs text-afri-text-3 font-semibold mt-0.5">
                            {ZONE_LABELS[order.delivery_zone]}
                          </p>
                        </div>

                        {/* Montant */}
                        <p className="text-sm font-black text-afri-amber whitespace-nowrap">
                          {formatFcfa(order.total_fcfa)}
                        </p>

                        {/* Statut */}
                        <div>
                          <Badge status={order.status} />
                        </div>

                        {/* Action */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(order);
                          }}
                          className="text-xs font-bold text-afri-text-3 hover:text-afri-terra transition-colors whitespace-nowrap hidden md:block"
                        >
                          Gérer →
                        </button>
                      </div>
                    ))
                  )}

                  {/* Footer */}
                  {filtered.length > 0 && (
                    <div className="px-4 py-2.5 border-t-2 border-afri-border bg-afri-cream flex items-center justify-between">
                      <p className="text-xs font-semibold text-afri-text-3">
                        {filtered.length} commande
                        {filtered.length > 1 ? "s" : ""}
                      </p>
                      <p className="text-xs font-extrabold text-afri-amber">
                        Total :{" "}
                        {formatFcfa(
                          filtered.reduce((s, o) => s + o.total_fcfa, 0),
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ══ SECTION REVENUS ══ */}
            {section === "revenue" && (
              <div className="max-w-2xl mx-auto flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <KpiCard
                    num={formatFcfa(stats.totalToday)}
                    label="Aujourd'hui"
                    color="terra"
                  />
                  <KpiCard
                    num={formatFcfa(stats.totalMonth)}
                    label="Ce mois"
                    color="amber"
                  />
                  <KpiCard
                    num={stats.totalOrders}
                    label="Commandes"
                    color="neutral"
                  />
                  <KpiCard
                    num={stats.delivered}
                    label="Livrées"
                    color="green"
                  />
                </div>
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

            {/* ══ SECTION CONFIG ══ */}
            {section === "settings" && (
              <div className="max-w-lg mx-auto flex flex-col gap-4">
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
                    .
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Drawer ── */}
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
