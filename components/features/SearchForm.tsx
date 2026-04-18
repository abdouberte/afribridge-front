"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialRef: string;
}

export default function SearchForm({ initialRef }: Props) {
  const router = useRouter();
  const [ref, setRef] = useState(initialRef);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = ref.trim().toUpperCase();
    if (!trimmed) {
      setError("Saisis un numéro de commande.");
      return;
    }
    if (!trimmed.startsWith("AFR-")) {
      setError("Format attendu : AFR-2025-XXXX");
      return;
    }
    setError("");
    router.push(`/suivi?ref=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        className={[
          "flex border-2 rounded-xl overflow-hidden",
          error
            ? "border-afri-error"
            : "border-afri-border focus-within:border-afri-terra",
        ].join(" ")}
        style={{ transition: "border-color 0.15s" }}
      >
        <input
          type="text"
          value={ref}
          onChange={(e) => {
            setRef(e.target.value);
            setError("");
          }}
          placeholder="AFR-2025-0042"
          className="flex-1 h-11 px-4 bg-afri-cream border-none outline-none text-sm font-bold text-afri-text placeholder:text-afri-text-3 placeholder:font-semibold"
          autoComplete="off"
          autoCapitalize="characters"
        />
        <button
          type="submit"
          className="bg-afri-terra hover:bg-afri-terra-dark text-white px-5 text-sm font-extrabold shrink-0 transition-colors duration-150"
        >
          Suivre →
        </button>
      </div>

      {error && (
        <p className="text-xs font-semibold text-afri-error mt-2 flex items-center gap-1">
          <span aria-hidden>⚠</span> {error}
        </p>
      )}
    </form>
  );
}
