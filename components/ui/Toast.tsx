'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useId,
  ReactNode,
} from 'react'

/* ─── Types ─── */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id:       string
  type:     ToastType
  title:    string
  message?: string
  duration: number
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, 'id'>) => void
  success: (title: string, message?: string) => void
  error:   (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info:    (title: string, message?: string) => void
}

/* ─── Context ─── */
const ToastContext = createContext<ToastContextValue | null>(null)

/* ─── Config par type ─── */
type TypeConfig = { accent: string; bg: string; iconBg: string; iconColor: string; path: string }

const TYPE_CONFIG: Record<ToastType, TypeConfig> = {
  success: {
    accent:     '#1B7A52',
    bg:         '#fff',
    iconBg:     '#E0F2EB',
    iconColor:  '#1B7A52',
    path:       'M5 13l4 4L19 7',
  },
  error: {
    accent:     '#C0392B',
    bg:         '#fff',
    iconBg:     '#FDECEA',
    iconColor:  '#C0392B',
    path:       'M6 18L18 6M6 6l12 12',
  },
  warning: {
    accent:     '#D4920A',
    bg:         '#fff',
    iconBg:     '#FEF3D0',
    iconColor:  '#D4920A',
    path:       'M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  },
  info: {
    accent:     '#C85A1E',
    bg:         '#fff',
    iconBg:     '#F9E8DC',
    iconColor:  '#C85A1E',
    path:       'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
}

/* ─── Composant Toast individuel ─── */
function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem
  onDismiss: (id: string) => void
}) {
  const cfg = TYPE_CONFIG[item.type]

  /* Auto-dismiss */
  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), item.duration)
    return () => clearTimeout(t)
  }, [item.id, item.duration, onDismiss])

  return (
    <div
      className="flex items-start gap-3 bg-white rounded-xl border-2 border-afri-border w-full max-w-sm pointer-events-auto"
      style={{
        borderLeftColor: cfg.accent,
        borderLeftWidth: '5px',
        boxShadow:       '3px 3px 0 #E8D0B0',
        animation:       'toast-in 0.2s ease-out',
      }}
    >
      {/* Icône */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-3 ml-3"
        style={{ background: cfg.iconBg }}
      >
        <svg
          width="14" height="14" fill="none" viewBox="0 0 24 24"
          stroke={cfg.iconColor} strokeWidth={2.5}
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d={cfg.path} />
        </svg>
      </div>

      {/* Texte */}
      <div className="flex-1 py-3 pr-0 min-w-0">
        <p className="text-sm font-extrabold text-afri-text leading-tight">
          {item.title}
        </p>
        {item.message && (
          <p className="text-xs font-semibold text-afri-text-3 mt-0.5 leading-relaxed">
            {item.message}
          </p>
        )}
      </div>

      {/* Fermer */}
      <button
        onClick={() => onDismiss(item.id)}
        className="mt-3 mr-3 shrink-0 text-afri-text-3 hover:text-afri-text transition-colors"
        aria-label="Fermer"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

/* ─── Provider ─── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const add = useCallback((opts: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev.slice(-3), { ...opts, id }]) // max 4 toasts
  }, [])

  const success = useCallback(
    (title: string, message?: string) =>
      add({ type: 'success', title, message, duration: 4000 }),
    [add]
  )
  const error = useCallback(
    (title: string, message?: string) =>
      add({ type: 'error', title, message, duration: 5000 }),
    [add]
  )
  const warning = useCallback(
    (title: string, message?: string) =>
      add({ type: 'warning', title, message, duration: 4000 }),
    [add]
  )
  const info = useCallback(
    (title: string, message?: string) =>
      add({ type: 'info', title, message, duration: 3500 }),
    [add]
  )

  return (
    <ToastContext.Provider value={{ toast: add, success, error, warning, info }}>
      {children}

      {/* Container — bas d'écran, centré mobile, droite desktop */}
      <div
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[380px] z-[9999] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} item={t} onDismiss={dismiss} />
        ))}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}

/* ─── Hook ─── */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast doit être utilisé dans un <ToastProvider>')
  return ctx
}