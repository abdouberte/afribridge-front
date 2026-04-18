export type OrderStatus =
    | 'pending'
    | 'paid'
    | 'purchased'
    | 'shipped'
    | 'delivered'

export type DeliveryZone = 'abidjan' | 'ci_interior' | 'bamako'

export interface Order {
    id: string
    order_number: string
    product_url: string
    product_price_eur: number
    exchange_rate: number
    total_fcfa: number
    customer_name: string
    customer_phone: string
    delivery_address: string
    delivery_zone: DeliveryZone
    status: OrderStatus
    payment_ref: string | null
    tracking_number: string | null
    notes: string | null
    created_at: string
}

export const STATUS_STEPS: OrderStatus[] = [
    'pending',
    'paid',
    'purchased',
    'shipped',
    'delivered',
]

export const STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'Commande reçue',
    paid: 'Paiement confirmé',
    purchased: 'Produit acheté',
    shipped: 'En transit',
    delivered: 'Livré',
}

export const STATUS_ICONS: Record<OrderStatus, string> = {
    pending: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2',
    paid: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    purchased: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    shipped: 'M12 19V6M5 12l7-7 7 7M3 19h18',
    delivered: 'M5 13l4 4L19 7',
}

export const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string; icon: string }> = {
    pending: { bg: '#FEF3D0', text: '#D4920A', border: '#F0CC80', icon: '#D4920A' },
    paid: { bg: '#EEF4FF', text: '#2563EB', border: '#BFDBFE', icon: '#2563EB' },
    purchased: { bg: '#F5F0FF', text: '#7C3AED', border: '#DDD6FE', icon: '#7C3AED' },
    shipped: { bg: '#F9E8DC', text: '#C85A1E', border: '#F0C8A0', icon: '#C85A1E' },
    delivered: { bg: '#E0F2EB', text: '#1B7A52', border: '#A7D7C5', icon: '#1B7A52' },
}

export const ZONE_LABELS: Record<DeliveryZone, string> = {
    abidjan: 'Abidjan',
    ci_interior: 'Intérieur CI',
    bamako: 'Bamako',
}