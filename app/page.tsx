import Link from 'next/link'
import HeroForm from '@/components/features/HeroForm'

/* ── Données statiques ── */
const STEPS = [
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C85A1E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.1-1.1" />
        <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    bg: 'bg-afri-terra-light',
    title: 'Colle le lien du produit',
    sub: 'Amazon, AliExpress, Zara, eBay… n'importe quelle boutique',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#D4920A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    bg: 'bg-afri-amber-light',
    title: 'Reçois le devis tout inclus',
    sub: 'Prix en FCFA, service et livraison déjà compris',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1B7A52" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    bg: 'bg-afri-green-light',
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
  { num: '142+', label: 'Commandes livrées' },
  { num: '2 sem.', label: 'Délai moyen' },
  { num: '4.9 ★', label: 'Note clients' },
]

/* ── Page ── */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-afri-cream font-sans">

      {/* ── BANDE KENTE ── */}
      <div className="flex h-1">
        {['#C85A1E', '#FDF6EC', '#D4920A', '#FDF6EC', '#1B7A52',
          '#FDF6EC', '#C85A1E', '#FDF6EC', '#D4920A', '#FDF6EC', '#C85A1E']
          .map((color, i) => (
            <div key={i} className="flex-1" style={{ background: color }} />
          ))}
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="bg-white border-b-2 border-afri-border px-4 py-3 flex items-center justify-between">
        <span className="text-lg font-black text-afri-text">
          Afri<span className="text-afri-terra">Bridge</span>
        </span>
        <Link
          href="/suivi"
          className="text-xs font-bold text-afri-text-3 hover:text-afri-terra transition-colors duration-150"
        >
          Suivre ma commande →
        </Link>
      </nav>

      {/* ── HERO SOMBRE ── */}
      <section className="bg-[#1C0E06] px-4 pt-8 pb-10">

        {/* Overline */}
        <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-afri-amber mb-3">
          Livraison aérienne · Côte d'Ivoire &amp; Mali
        </p>

        {/* Titre */}
        <h1 className="text-4xl font-black text-white leading-none mb-4">
          Le monde entier<br />
          livré<br />
          <span className="text-afri-terra">chez toi.</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-sm font-semibold text-white/55 leading-relaxed mb-6">
          Amazon, AliExpress, Zara, eBay… Colle le lien,
          paie en Mobile Money, reçois en 2 semaines.
        </p>

        {/* Formulaire interactif */}
        <HeroForm />

        {/* Modes de paiement */}
        <div className="flex gap-3 mt-5">
          {[
            { color: '#FF6000', label: 'Orange Money' },
            { color: '#1ABCFE', label: 'Wave CI' },
          ].map(({ color, label }) => (
            <div
              key={label}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 flex items-center justify-center gap-2"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: color }}
              />
              <span className="text-xs font-bold text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── BANDEAU ZONES ── */}
      <div className="bg-afri-terra flex overflow-x-auto">
        {ZONES.map((zone, i) => (
          <div
            key={zone}
            className={[
              'flex items-center gap-2 px-4 py-2 shrink-0',
              'text-xs font-extrabold text-white/90',
              i < ZONES.length - 1 ? 'border-r border-white/20' : '',
            ].join(' ')}
          >
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {zone}
          </div>
        ))}
        <div className="flex items-center px-4 py-2 shrink-0 text-xs font-extrabold text-white/70">
          2 semaines max
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="flex border-b-2 border-afri-border bg-white">
        {STATS.map(({ num, label }, i) => (
          <div
            key={label}
            className={[
              'flex-1 py-4 text-center',
              i < STATS.length - 1 ? 'border-r border-afri-border' : '',
            ].join(' ')}
          >
            <p className="text-base font-black text-afri-terra">{num}</p>
            <p className="text-[10px] font-bold text-afri-text-3 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="px-4 pt-6 pb-6 bg-afri-cream">
        <p className="text-[10px] font-extrabold tracking-widest uppercase text-afri-text-3 mb-4">
          Comment ça marche
        </p>
        <div className="flex flex-col gap-4">
          {STEPS.map(({ icon, bg, title, sub }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                {icon}
              </div>
              <div className="pt-0.5">
                <p className="text-sm font-extrabold text-afri-text">{title}</p>
                <p className="text-xs text-afri-text-3 mt-0.5 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SITES COMPATIBLES ── */}
      <section className="px-4 pb-6 bg-afri-cream border-t-2 border-afri-border pt-5">
        <p className="text-[10px] font-extrabold tracking-widest uppercase text-afri-text-3 mb-3">
          Sites compatibles
        </p>
        <div className="flex flex-wrap gap-2">
          {SITES.map((site) => (
            <span
              key={site}
              className="bg-white border-2 border-afri-border rounded-lg px-3 py-1.5 text-xs font-extrabold text-afri-text shadow-[2px_2px_0px_#E8D0B0]"
            >
              {site}
            </span>
          ))}
        </div>
      </section>

      {/* ── TÉMOIGNAGE ── */}
      <section className="px-4 pb-6 pt-2 bg-afri-cream border-t-2 border-afri-border">
        <p className="text-[10px] font-extrabold tracking-widest uppercase text-afri-text-3 mb-3 pt-3">
          Ce que disent nos clients
        </p>
        <div className="bg-white border-2 border-afri-border rounded-xl p-4 shadow-[3px_3px_0px_#E8D0B0]">
          <p className="text-sm font-semibold text-afri-text-2 leading-relaxed mb-4 pl-3 border-l-4 border-afri-terra">
            "J'ai commandé depuis Abidjan sur AliExpress, reçu en 11 jours chrono. Aucun souci, je recommande à tout le monde !"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-afri-terra flex items-center justify-center text-xs font-black text-white shrink-0">
              FK
            </div>
            <div>
              <p className="text-xs font-extrabold text-afri-text">Fatoumata K.</p>
              <p className="text-xs text-afri-text-3">Cocody, Abidjan</p>
            </div>
            <span className="ml-auto text-sm text-afri-amber">★★★★★</span>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-4 pb-10 pt-2 bg-white border-t-2 border-afri-border">
        <p className="text-sm font-bold text-afri-text-3 text-center pt-5 mb-4 leading-relaxed">
          Livraison aérienne rapide.<br />
          Paiement 100% Mobile Money.
        </p>
        <Link
          href="/commande"
          className="block w-full text-center py-4 bg-afri-amber text-white text-base font-extrabold rounded-xl border-2 border-[#B07810] shadow-[4px_4px_0px_#B07810] hover:bg-[#B07810] transition-colors duration-150 active:shadow-[2px_2px_0px_#B07810] active:translate-x-0.5 active:translate-y-0.5"
        >
          Commencer ma commande →
        </Link>
        <p className="text-center text-xs text-afri-text-3 mt-3 font-semibold">
          Gratuit · Sans inscription · Sans carte bancaire
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1C0E06] px-4 py-6 text-center">
        <p className="text-base font-black text-white mb-1">
          Afri<span className="text-afri-terra">Bridge</span>
        </p>
        <p className="text-xs text-white/35 mb-4">
          Service de conciergerie e-commerce · CI &amp; Mali
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/suivi" className="text-xs text-white/45 hover:text-white/70 font-semibold">
            Suivre une commande
          </Link>
          <Link href="/commande" className="text-xs text-white/45 hover:text-white/70 font-semibold">
            Passer commande
          </Link>
        </div>
      </footer>

    </main>
  )
}