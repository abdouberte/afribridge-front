import Link from 'next/link'
import HeroForm from '@/components/features/HeroForm'

const STEPS = [
  {
    bg: 'bg-afri-terra-light',
    stroke: '#C85A1E',
    path: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.1-1.1M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    title: 'Colle le lien du produit',
    sub: 'Amazon, AliExpress, Zara, eBay… n\'importe quelle boutique en ligne',
  },
  {
    bg: 'bg-afri-amber-light',
    stroke: '#D4920A',
    path: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Reçois le devis tout inclus',
    sub: 'Prix en FCFA, service et livraison déjà compris',
  },
  {
    bg: 'bg-afri-green-light',
    stroke: '#1B7A52',
    path: 'M5 13l4 4L19 7',
    title: 'Paye en Mobile Money',
    sub: 'Orange Money · Wave CI — reçois ton colis en ~2 semaines',
  },
]

const SITES = [
  'Amazon', 'AliExpress', 'eBay', 'Zara',
  'ASOS', 'IKEA', 'Nike', 'Cdiscount', 'Bershka', '+ tout site',
]

const ZONES = ['Abidjan', 'Intérieur CI', 'Bamako']

const STATS = [
  { num: '142+',   label: 'Commandes livrées' },
  { num: '2 sem.', label: 'Délai moyen' },
  { num: '4.9 ★',  label: 'Note clients' },
]

const KENTE = [
  '#C85A1E', '#FDF6EC', '#D4920A', '#FDF6EC', '#1B7A52',
  '#FDF6EC', '#C85A1E', '#FDF6EC', '#D4920A', '#FDF6EC', '#C85A1E',
]

const PAYMENT = [
  { color: '#FF6000', label: 'Orange Money' },
  { color: '#1ABCFE', label: 'Wave CI' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-afri-cream font-sans">

      {/* ── BANDE KENTE ── */}
      <div className="flex h-1.5">
        {KENTE.map((color, i) => (
          <div key={i} className="flex-1" style={{ background: color }} />
        ))}
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="bg-white border-b-2 border-afri-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-black text-afri-text">
            Afri<span className="text-afri-terra">Bridge</span>
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/suivi"
              className="text-xs font-bold text-afri-text-3 hover:text-afri-terra transition-colors"
            >
              Suivre ma commande
            </Link>
            <Link
              href="/commande"
              className="hidden md:inline-flex items-center px-4 py-2 bg-afri-terra text-white text-xs font-extrabold rounded-lg border-2 border-afri-terra-dark"
              style={{ boxShadow: '2px 2px 0 #A8481A' }}
            >
              Passer commande →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SOMBRE ── */}
      <section style={{ background: '#1C0E06' }}>
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 md:grid md:grid-cols-2 md:gap-16 md:items-center">

          {/* Colonne gauche — titre */}
          <div>
            <p className="text-xs font-extrabold tracking-widest uppercase text-afri-amber mb-4">
              Livraison aérienne · Côte d'Ivoire &amp; Mali
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none mb-5">
              Le monde entier<br />
              livré<br />
              <span className="text-afri-terra">chez toi.</span>
            </h1>
            <p className="text-sm md:text-base font-semibold leading-relaxed mb-6 md:mb-8"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              Amazon, AliExpress, Zara, eBay… Colle le lien,
              paie en Mobile Money, reçois en 2 semaines.
              Sans carte bancaire.
            </p>

            {/* Paiements — visible desktop colonne gauche */}
            <div className="hidden md:flex gap-3">
              {PAYMENT.map(({ color, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite — formulaire */}
          <div
            className="mt-8 md:mt-0 rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <p className="text-xs font-extrabold tracking-widest uppercase text-afri-amber mb-4">
              Obtenir un devis gratuit
            </p>
            <HeroForm />

            {/* Paiements — visible mobile sous le form */}
            <div className="flex gap-3 mt-5 md:hidden">
              {PAYMENT.map(({ color, label }) => (
                <div
                  key={label}
                  className="flex-1 rounded-lg py-2 flex items-center justify-center gap-2"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── BANDEAU ZONES ── */}
      <div className="bg-afri-terra">
        <div className="max-w-5xl mx-auto flex overflow-x-auto">
          {ZONES.map((zone, i) => (
            <div
              key={zone}
              className={[
                'flex items-center gap-2 px-5 py-2.5 shrink-0',
                'text-xs font-extrabold text-white',
                i < ZONES.length - 1 ? 'border-r border-white/20' : '',
              ].join(' ')}
            >
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {zone}
            </div>
          ))}
          <div className="flex items-center px-5 py-2.5 shrink-0 text-xs font-extrabold"
            style={{ color: 'rgba(255,255,255,0.65)' }}>
            2 semaines max
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="bg-white border-b-2 border-afri-border">
        <div className="max-w-5xl mx-auto flex">
          {STATS.map(({ num, label }, i) => (
            <div
              key={label}
              className={[
                'flex-1 py-5 text-center',
                i < STATS.length - 1 ? 'border-r border-afri-border' : '',
              ].join(' ')}
            >
              <p className="text-xl font-black text-afri-terra">{num}</p>
              <p className="text-xs font-bold text-afri-text-3 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="bg-afri-cream border-b-2 border-afri-border">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <p className="text-xs font-extrabold tracking-widest uppercase text-afri-text-3 mb-8 text-center">
            Comment ça marche
          </p>
          {/* Mobile : liste verticale — Desktop : 3 colonnes */}
          <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-8">
            {STEPS.map(({ bg, stroke, path, title, sub }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 md:flex-col md:gap-4 md:bg-white md:border-2 md:border-afri-border md:rounded-2xl md:p-6"
                style={{ boxShadow: 'var(--shadow-solid)' }}
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
                    stroke={stroke} strokeWidth={2}
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-afri-terra mb-1">
                    Étape {i + 1}
                  </p>
                  <p className="text-sm font-extrabold text-afri-text mb-1">{title}</p>
                  <p className="text-xs text-afri-text-3 leading-relaxed">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SITES COMPATIBLES ── */}
      <section className="bg-afri-cream border-b-2 border-afri-border">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-xs font-extrabold tracking-widest uppercase text-afri-text-3 mb-4 text-center">
            Sites compatibles
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SITES.map((site) => (
              <span
                key={site}
                className="bg-white border-2 border-afri-border rounded-lg px-4 py-2 text-sm font-extrabold text-afri-text"
                style={{ boxShadow: 'var(--shadow-solid)' }}
              >
                {site}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGE ── */}
      <section className="bg-afri-cream border-b-2 border-afri-border">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <p className="text-xs font-extrabold tracking-widest uppercase text-afri-text-3 mb-5 text-center">
            Ce que disent nos clients
          </p>
          <div
            className="bg-white border-2 border-afri-border rounded-2xl p-6"
            style={{ boxShadow: 'var(--shadow-solid)' }}
          >
            <p className="text-base font-semibold text-afri-text-2 leading-relaxed mb-5 pl-4 border-l-4 border-afri-terra">
              "J'ai commandé depuis Abidjan sur AliExpress, reçu en 11 jours chrono.
              Aucun souci, je recommande à tout le monde !"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-afri-terra flex items-center justify-center text-sm font-black text-white shrink-0">
                FK
              </div>
              <div>
                <p className="text-sm font-extrabold text-afri-text">Fatoumata K.</p>
                <p className="text-xs text-afri-text-3">Cocody, Abidjan</p>
              </div>
              <span className="ml-auto text-base text-afri-amber">★★★★★</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-white border-b-2 border-afri-border">
        <div className="max-w-lg mx-auto px-4 py-12 text-center">
          <p className="text-base font-bold text-afri-text-2 mb-2 leading-relaxed">
            Livraison aérienne rapide.
          </p>
          <p className="text-base font-bold text-afri-text-2 mb-6 leading-relaxed">
            Paiement 100% Mobile Money.
          </p>
          <Link
            href="/commande"
            className="block w-full py-4 bg-afri-amber text-white text-lg font-extrabold rounded-xl border-2 border-afri-amber-dark hover:bg-afri-amber-dark transition-colors"
            style={{ boxShadow: 'var(--shadow-solid-amber)' }}
          >
            Commencer ma commande →
          </Link>
          <p className="text-xs text-afri-text-3 mt-3 font-semibold">
            Gratuit · Sans inscription · Sans carte bancaire
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#1C0E06' }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-lg font-black text-white mb-1">
                Afri<span className="text-afri-terra">Bridge</span>
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Service de conciergerie e-commerce · CI &amp; Mali
              </p>
            </div>
            <div className="flex gap-8">
              <Link href="/suivi"
                className="text-sm font-semibold transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}>
                Suivre une commande
              </Link>
              <Link href="/commande"
                className="text-sm font-semibold transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}>
                Passer commande
              </Link>
            </div>
          </div>
          <div
            className="mt-8 pt-6 text-xs text-center"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            © {new Date().getFullYear()} AfriBridge — Tous droits réservés
          </div>
        </div>
      </footer>

    </main>
  )
}