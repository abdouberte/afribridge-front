import { CSSProperties, ReactNode } from "react";

export type CardVariant =
  | "default"
  | "orange-accent" // bord gauche terracotta → devis, produit
  | "green-accent" // bord gauche vert → paiement, confirmation
  | "amber-top" // bord haut ambre → commande admin
  | "info"; // fond crème doré → avertissements

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

// Styles de base communs à toutes les variantes
const BASE =
  "bg-white rounded-[14px] p-[1.1rem] border-2 border-afri-border shadow-[4px_4px_0px_#E8D0B0]";

// Styles inline pour les accents colorés (fiable sur tous appareils)
const accentStyle: Partial<Record<CardVariant, CSSProperties>> = {
  "orange-accent": { borderLeftColor: "#C85A1E", borderLeftWidth: "5px" },
  "green-accent": { borderLeftColor: "#1B7A52", borderLeftWidth: "5px" },
  "amber-top": { borderTopColor: "#D4920A", borderTopWidth: "4px" },
};

export default function Card({
  children,
  variant = "default",
  className = "",
}: CardProps) {
  if (variant === "info") {
    return (
      <div
        className={[
          "rounded-[12px] p-4",
          "bg-afri-amber-light border-2",
          "shadow-[4px_4px_0px_#F0CC80]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ borderColor: "#F0CC80" }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={[BASE, className].filter(Boolean).join(" ")}
      style={accentStyle[variant]}
    >
      {children}
    </div>
  );
}
