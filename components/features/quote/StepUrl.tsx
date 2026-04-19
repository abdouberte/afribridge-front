"use client";

const SITES = [
  "Amazon",
  "AliExpress",
  "eBay",
  "Zara",
  "ASOS",
  "IKEA",
  "Nike",
  "Cdiscount",
  "+ tout site",
];

interface Props {
  url: string;
  error?: string;
  onChange: (url: string) => void;
  onNext: () => void;
}

export default function StepUrl({ url, error, onChange, onNext }: Props) {
  return (
    <div>
      <h1 className="text-xl font-black text-afri-text mb-1">
        Colle le lien du produit
      </h1>
      <p className="text-sm text-afri-text-3 font-semibold mb-6 leading-relaxed">
        Amazon, AliExpress, Zara, eBay… n'importe quelle boutique en ligne.
      </p>

      {/* Champ URL */}
      <div className="flex flex-col gap-1.5 mb-6">
        <label className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wider">
          Lien du produit <span className="text-afri-terra">*</span>
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://amazon.fr/…  · aliexpress.com/…"
          inputMode="url"
          autoComplete="off"
          autoCapitalize="none"
          className={[
            "w-full h-11 px-3.5 font-semibold text-sm text-afri-text bg-white",
            "border-2 rounded-xl outline-none transition-colors duration-150",
            "placeholder:text-afri-text-3 focus:border-afri-terra",
            error ? "border-afri-error" : "border-afri-border",
          ].join(" ")}
        />
        {error && (
          <p className="text-xs font-semibold text-afri-error flex items-center gap-1">
            <span aria-hidden>⚠</span> {error}
          </p>
        )}
      </div>

      {/* Sites supportés */}
      <div className="mb-8">
        <p className="text-xs font-extrabold text-afri-text-3 uppercase tracking-wider mb-3">
          Sites compatibles
        </p>
        <div className="flex flex-wrap gap-2">
          {SITES.map((s) => (
            <span
              key={s}
              className="bg-white border-2 border-afri-border rounded-lg px-3 py-1 text-xs font-extrabold text-afri-text"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full py-4 bg-afri-terra text-white font-extrabold text-base rounded-xl border-2 border-afri-terra-dark hover:bg-afri-terra-dark transition-colors"
        style={{ boxShadow: "3px 3px 0 #A8481A" }}
      >
        Continuer → Prix &amp; devis
      </button>
    </div>
  );
}
