import type { Metadata } from 'next'
import QuoteForm from '@/components/features/quote/QuoteForm'

export const metadata: Metadata = {
  title: 'Passer commande — AfriBridge',
  description: `Obtiens un devis en FCFA et commande depuis n'importe quel site en ligne.`,
}

interface Props {
  searchParams: { url?: string }
}

export default function CommandePage({ searchParams }: Props) {
  const initialUrl = searchParams.url ?? ''
  return <QuoteForm initialUrl={initialUrl} />
}