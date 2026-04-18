/* ─── Types ─── */
interface LoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  inline?: boolean; // true = inline dans un bouton ou une ligne
}

/* ─── Config tailles ─── */
const SIZE = {
  sm: {
    dot: "w-1.5 h-1.5",
    gap: "gap-1",
    text: "text-xs",
    wrap: "gap-2",
    pad: "py-3",
  },
  md: {
    dot: "w-2.5 h-2.5",
    gap: "gap-1.5",
    text: "text-sm",
    wrap: "gap-3",
    pad: "py-6",
  },
  lg: {
    dot: "w-3.5 h-3.5",
    gap: "gap-2",
    text: "text-base",
    wrap: "gap-4",
    pad: "py-10",
  },
};

/* ─── Dots Kente ─── */
function KenteDots({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = SIZE[size];

  const DOTS = [
    { color: "#C85A1E", delay: "0ms" },
    { color: "#D4920A", delay: "150ms" },
    { color: "#1B7A52", delay: "300ms" },
    { color: "#C85A1E", delay: "450ms" },
  ];

  return (
    <>
      <div className={`flex items-center ${s.gap}`}>
        {DOTS.map(({ color, delay }, i) => (
          <span
            key={i}
            className={`${s.dot} rounded-full`}
            style={{
              background: color,
              display: "inline-block",
              animation: `kente-bounce 1.2s ease-in-out infinite`,
              animationDelay: delay,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes kente-bounce {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }
          40%            { transform: scale(1);    opacity: 1;    }
        }
      `}</style>
    </>
  );
}

/* ─── Loader principal ─── */
export default function Loader({
  message,
  size = "md",
  inline = false,
}: LoaderProps) {
  const s = SIZE[size];

  /* Mode inline — pour boutons et lignes */
  if (inline) {
    return (
      <span className={`inline-flex items-center ${s.wrap}`}>
        <KenteDots size={size} />
        {message && (
          <span className={`${s.text} font-semibold text-afri-text-3`}>
            {message}
          </span>
        )}
      </span>
    );
  }

  /* Mode bloc — page complète ou section */
  return (
    <div
      className={`flex flex-col items-center justify-center ${s.wrap} ${s.pad} w-full`}
      role="status"
      aria-label={message ?? "Chargement…"}
    >
      <KenteDots size={size} />
      {message && (
        <p className={`${s.text} font-bold text-afri-text-2 text-center`}>
          {message}
        </p>
      )}
    </div>
  );
}

/* ─── Skeleton ─── */
export function SkeletonLine({
  width = "w-full",
  height = "h-3",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={`${width} ${height} bg-afri-border rounded-md`}
      style={{ animation: "skel-pulse 1.5s ease-in-out infinite" }}
    />
  );
}

export function SkeletonCard() {
  return (
    <>
      <div
        className="bg-white border-2 border-afri-border rounded-2xl p-4 flex flex-col gap-3"
        style={{ boxShadow: "3px 3px 0 #E8D0B0" }}
        aria-hidden
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-afri-border shrink-0"
            style={{ animation: "skel-pulse 1.5s ease-in-out infinite" }}
          />
          <div className="flex flex-col gap-2 flex-1">
            <SkeletonLine height="h-3" />
            <SkeletonLine width="w-2/3" height="h-2.5" />
          </div>
        </div>

        {/* Lignes */}
        <div className="flex flex-col gap-2 pt-1">
          <SkeletonLine />
          <SkeletonLine width="w-4/5" />
          <SkeletonLine width="w-3/5" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-1 border-t border-afri-border">
          <SkeletonLine width="w-1/3" height="h-5" />
          <SkeletonLine width="w-1/4" height="h-6" />
        </div>
      </div>

      <style>{`
        @keyframes skel-pulse {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.45; }
        }
      `}</style>
    </>
  );
}

/* ─── Loader page entière ─── */
export function PageLoader({ message = "Chargement…" }: { message?: string }) {
  return (
    <div className="min-h-screen bg-afri-cream flex items-center justify-center">
      <Loader message={message} size="lg" />
    </div>
  );
}
