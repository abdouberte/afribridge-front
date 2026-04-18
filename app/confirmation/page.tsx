import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Commande confirmée — AfriBridge',
  description: 'Votre commande a bien été reçue. Suivez-la avec votre numéro de commande.',
}

const KENTE = [
  '#C85A1E', '#FDF6EC', '#D4920A', '#FDF6EC', '#1B7A52',
  '#FDF6EC', '#C85A1E', '#FDF6EC', '#D4920A', '#FDF6EC', '#C85A1E',
]

interface Props {
  searchParams: {
    ref?:     string
    total?:   string
    zone?:    string
    name?:    string
  }
}

export default function ConfirmationPage({ searchParams }: Props) {
  const ref   = searchParams.ref   ?? ''
  const total = searchParams.total ?? ''
  const zone  = searchParams.zone  ?? ''
  const name  = searchParams.name  ?? ''

  return (
    <main className="min-h-screen bg-afri-cream font-sans">

      {/* ── Kente ── */}
      <div className="flex h-1.5">
        {KENTE.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>

      {/* ── Nav ── */}
      <nav className="bg-white border-b-2 border-afri-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-center">
          <span className="text-base font-black text-afri-text">
            Afri<span className="text-afri-terra">Bridge</span>
          </span>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-10 pb-16 flex flex-col items-center text-center gap-6">

        {/* ── Icône succès ── */}
        <div
          className="w-20 h-20 rounded-full bg-afri-green-light border-2 flex items-center justify-center"
          style={{ borderColor: '#A7D7C5', boxShadow: '4px 4px 0 #A7D7C5' }}
        >
          <svg
            width="36" height="36" fill="none" viewBox="0 0 24 24"
            stroke="#1B7A52" strokeWidth={2.5}
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* ── Titre ── */}
        <div>
          <p className="text-xs font-extrabold tracking-widest uppercase text-afri-green mb-2">
            Paiement confirmé
          </p>
          <h1 className="text-2xl font-black text-afri-text leading-tight mb-2">
            {name ? `Merci ${name.split(' ')[0]} !` : 'Commande reçue !'}
          </h1>
          <p className="text-sm font-semibold text-afri-text-3 leading-relaxed">
            Ton paiement a bien été reçu. On s'occupe d'acheter
            ton produit et de te l'envoyer sous 2 semaines.
          </p>
        </div>

        {/* ── Numéro de commande ── */}
        {ref && (
          <div
            className="w-full bg-white border-2 border-afri-border rounded-2xl p-5"
            style={{ boxShadow: '4px 4px 0 #E8D0B0' }}
          >
            <p className="text-xs font-extrabold text-afri-text-3 uppercase tracking-wider mb-1">
              Ton numéro de commande
            </p>
            <p className="text-3xl font-black text-afri-terra tracking-wider mb-1">
              {ref}
            </p>
            <p className="text-xs font-semibold text-afri-text-3">
              Conserve ce numéro — il te servira à suivre ta commande.
            </p>
          </div>
        )}

        {/* ── Récap ── */}
        {(total || zone) && (
          <div className="w-full flex flex-col gap-0 border-2 border-afri-border rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: '3px 3px 0 #E8D0B0' }}>
            {total && (
              <div className="flex justify-between items-center px-4 py-3 border-b border-afri-border">
                <span className="text-xs font-semibold text-afri-text-3">Montant payé</span>
                <span className="text-base font-black text-afri-amber">{total} FCFA</span>
              </div>
            )}
            {zone && (
              <div className="flex justify-between items-center px-4 py-3 border-b border-afri-border">
                <span className="text-xs font-semibold text-afri-text-3">Zone de livraison</span>
                <span className="text-sm font-bold text-afri-text">{zone}</span>
              </div>
            )}
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-xs font-semibold text-afri-text-3">Délai estimé</span>
              <span className="text-sm font-bold text-afri-text">~2 semaines</span>
            </div>
          </div>
        )}

        {/* ── Étapes suivantes ── */}
        <div className="w-full flex flex-col gap-3">
          <p className="text-xs font-extrabold text-afri-text-3 uppercase tracking-wider text-left">
            Prochaines étapes
          </p>
          {[
            {
              icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
              bg:   'bg-afri-terra-light',
              stroke: '#C85A1E',
              title: 'SMS de confirmation',
              sub:   'Tu vas recevoir un SMS avec ton numéro de commande.',
            },
            {
              icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
              bg:   'bg-afri-amber-light',
              stroke: '#D4920A',
              title: 'On achète ton produit',
              sub:   'Nous achetons ton produit dans les 24h après confirmation.',
            },
            {
              icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12',
              bg:   'bg-afri-green-light',
              stroke: '#1B7A52',
              title: 'Livraison en ~2 semaines',
              sub:   'Ton colis part par avion vers Abidjan ou Bamako.',
            },
          ].map(({ icon, bg, stroke, title, sub }, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white border-2 border-afri-border rounded-xl p-4"
              style={{ boxShadow: '2px 2px 0 #E8D0B0' }}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
                  stroke={stroke} strokeWidth={2}
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </div>
              <div>
                <p className="text-sm font-extrabold text-afri-text">{title}</p>
                <p className="text-xs font-semibold text-afri-text-3 mt-0.5 leading-relaxed">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTAs ── */}
        <div className="w-full flex flex-col gap-3">
          {ref && (
            <Link
              href={`/suivi?ref=${ref}`}
              className="block w-full py-4 bg-afri-terra text-white text-base font-extrabold rounded-xl border-2 border-afri-terra-dark text-center hover:bg-afri-terra-dark transition-colors"
              style={{ boxShadow: '3px 3px 0 #A8481A' }}
            >
              Suivre ma commande →
            </Link>
          )}
          <Link
            href="/"
            className="block w-full py-3.5 bg-white text-afri-terra text-sm font-extrabold rounded-xl border-2 border-afri-terra text-center hover:bg-afri-terra-light transition-colors"
            style={{ boxShadow: '3px 3px 0 #E8D0B0' }}
          >
            Passer une nouvelle commande
          </Link>
        </div>

        {/* ── Support ── */}
        <p className="text-xs font-semibold text-afri-text-3 leading-relaxed">
          Un problème ?{' '}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Bonjour, ma commande ${ref}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-afri-terra font-extrabold hover:underline"
          >
            Contacte-nous sur WhatsApp →
          </a>
        </p>

      </div>
    </main>
  )
}