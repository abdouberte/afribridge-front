import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ToastProvider } from '@/components/ui/Toast'
import './globals.css'


const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap", // fallback immédiat sur Verdana si font pas chargée
});

export const metadata: Metadata = {
  title: {
    default:  `AfriBridge — Livraison depuis nimporte quel site`,
    template: '%s — AfriBridge',
  },
  description:
    `Commande sur Amazon, AliExpress, Zara et plus — livré en Côte d'Ivoire et au Mali via Mobile Money. Sans carte bancaire.`,
  keywords: [
    'AfriBridge', 'livraison Abidjan', 'livraison Bamako',
    'Amazon CI', 'AliExpress Mali', 'Orange Money commande',
    'conciergerie e-commerce Afrique',
  ],
  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    url:         process.env.NEXT_PUBLIC_SITE_URL ?? 'https://afribridge.com',
    siteName:    'AfriBridge',
    title:       'AfriBridge — Le monde entier livré chez toi',
    description: `Commande sur n'importe quel site, paie en Orange Money ou Wave CI, reçois en 2 semaines.`,
    images: [
      {
        url:    '/og-image.png',
        width:  1200,
        height: 630,
        alt:    `AfriBridge — Livraison depuis n'importe quel site`,
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'AfriBridge — Le monde entier livré chez toi',
    description: `Commande sur n'importe quel site, paie en Mobile Money, reçois en 2 semaines.`,
    images:      ['/og-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={nunito.className}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
