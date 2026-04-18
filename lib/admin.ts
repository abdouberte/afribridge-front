import { Order, OrderStatus, STATUS_LABELS } from './types'

export interface AdminStats {
    pending: number
    inProgress: number
    delivered: number
    totalToday: number
    totalMonth: number
    totalOrders: number
}

export function computeStats(orders: Order[]): AdminStats {
    const today = new Date().toDateString()
    const month = new Date().getMonth()

    return {
        pending: orders.filter((o) => o.status === 'pending').length,
        inProgress: orders.filter((o) => ['paid', 'purchased', 'shipped'].includes(o.status)).length,
        delivered: orders.filter((o) => o.status === 'delivered').length,
        totalOrders: orders.length,
        totalToday: orders
            .filter((o) => new Date(o.created_at).toDateString() === today)
            .reduce((sum, o) => sum + o.total_fcfa, 0),
        totalMonth: orders
            .filter((o) => new Date(o.created_at).getMonth() === month)
            .reduce((sum, o) => sum + o.total_fcfa, 0),
    }
}

export const FILTER_OPTIONS: { label: string; value: OrderStatus | 'all' }[] = [
    { label: 'Toutes', value: 'all' },
    { label: 'En attente', value: 'pending' },
    { label: 'Payées', value: 'paid' },
    { label: 'Achetées', value: 'purchased' },
    { label: 'En transit', value: 'shipped' },
    { label: 'Livrées', value: 'delivered' },
]

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS) as [OrderStatus, string][]

// Mot de passe admin — côté client uniquement pour le MVP
// Remplacer par une vraie auth (NextAuth, Supabase Auth) en production
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '***REMOVED***'