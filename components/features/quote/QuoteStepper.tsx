type Step = 1 | 2 | 3;

interface Props {
  step: Step;
}

const STEPS: { label: string; num: Step }[] = [
  { label: "Lien", num: 1 },
  { label: "Devis", num: 2 },
  { label: "Infos", num: 3 },
];

export default function QuoteStepper({ step }: Props) {
  return (
    <div className="bg-white border-b-2 border-afri-border px-4 py-3">
      <div className="flex items-center max-w-lg mx-auto">
        {STEPS.map(({ label, num }, i) => {
          const done = step > num;
          const active = step === num;
          return (
            <div key={num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={[
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-black",
                    done ? "bg-afri-green text-white" : "",
                    active ? "bg-afri-terra text-white" : "",
                    !done && !active
                      ? "bg-afri-terra-light text-afri-text-3"
                      : "",
                  ].join(" ")}
                >
                  {done ? (
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
                  ) : (
                    num
                  )}
                </div>
                <span
                  className={[
                    "text-[10px] font-bold mt-1",
                    done ? "text-afri-green" : "",
                    active ? "text-afri-terra" : "",
                    !done && !active ? "text-afri-text-3" : "",
                  ].join(" ")}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-2 mb-4 rounded"
                  style={{ background: done ? "#1B7A52" : "#E8D0B0" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
