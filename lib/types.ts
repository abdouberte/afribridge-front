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