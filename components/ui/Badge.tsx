import { OrderStatus } from "@/lib/types";

interface BadgeProps {
  status: OrderStatus;
  className?: string;
}

type StatusConfig = {
  label: string;
  wrapper: string;
  dot: string;
};

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: "En attente",
    wrapper: "bg-afri-amber-light text-afri-amber border-[#F0CC80]",
    dot: "bg-afri-amber",
  },
  paid: {
    label: "Payé",
    wrapper: "bg-afri-blue-light text-afri-blue border-[#BFDBFE]",
    dot: "bg-afri-blue",
  },
  purchased: {
    label: "Acheté",
    wrapper: "bg-afri-purple-light text-afri-purple border-[#DDD6FE]",
    dot: "bg-afri-purple",
  },
  shipped: {
    label: "En transit",
    wrapper: "bg-afri-terra-light text-afri-terra border-[#F9C9A8]",
    dot: "bg-afri-terra",
  },
  delivered: {
    label: "Livré",
    wrapper: "bg-afri-green-light text-afri-green border-[#A7D7C5]",
    dot: "bg-afri-green",
  },
};

export default function Badge({ status, className = "" }: BadgeProps) {
  const { label, wrapper, dot } = STATUS_CONFIG[status];

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "text-[11px] font-extrabold rounded-full",
        "px-3 py-[5px] border-2 whitespace-nowrap",
        wrapper,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={["w-1.5 h-1.5 rounded-full flex-shrink-0", dot].join(" ")}
      />
      {label}
    </span>
  );
}
