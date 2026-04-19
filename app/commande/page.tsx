import type { Metadata } from "next";
import QuoteForm from "@/components/features/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Passer commande — AfriBridge",
  description: `Obtiens un devis en FCFA et commande depuis n'importe quel site en ligne.`,
};

interface Props {
  searchParams: Promise<{ url?: string }>;
}

export default async function CommandePage({ searchParams }: Props) {
  const { url } = await searchParams
  return <QuoteForm initialUrl={url ?? ''} />
}
