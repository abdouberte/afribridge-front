import { AdminStats as Stats } from "@/lib/admin";
import { formatFcfa } from "@/lib/pricing";

interface KpiCardProps {
  num: string | number;
  label: string;
  color?: "terra" | "amber" | "green" | "neutral";
}

export function KpiCard({ num, label, color = "terra" }: KpiCardProps) {
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

interface Props {
  stats: Stats;
  variant: "orders" | "revenue";
}

export default function AdminStats({ stats, variant }: Props) {
  if (variant === "orders") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard num={stats.pending} label="En attente" color="terra" />
        <KpiCard num={stats.inProgress} label="En cours" color="amber" />
        <KpiCard num={stats.delivered} label="Livrées" color="green" />
        <KpiCard
          num={formatFcfa(stats.totalToday)}
          label="FCFA aujourd'hui"
          color="neutral"
        />
      </div>
    );
  }

  return (
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
      <KpiCard num={stats.totalOrders} label="Commandes" color="neutral" />
      <KpiCard num={stats.delivered} label="Livrées" color="green" />
    </div>
  );
}
