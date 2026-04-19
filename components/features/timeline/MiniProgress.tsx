import { OrderStatus, STATUS_STEPS } from "@/lib/types";

interface Props {
  status: OrderStatus;
}

const SHORT_LABELS: Record<OrderStatus, string> = {
  pending: "Reçue",
  paid: "Payé",
  purchased: "Acheté",
  shipped: "Transit",
  delivered: "Livré",
};

export default function MiniProgress({ status }: Props) {
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
                  background: done ? "#1B7A52" : active ? "#C85A1E" : "#F0E4D0",
                  border: `2px solid ${
                    done ? "#1B7A52" : active ? "#C85A1E" : "#E8D0B0"
                  }`,
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
          return (
            <span
              key={s}
              className="text-[8px] flex-1 text-center"
              style={{
                color: done ? "#1B7A52" : active ? "#C85A1E" : "#B89070",
                fontWeight: active ? 800 : 700,
              }}
            >
              {SHORT_LABELS[s]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
