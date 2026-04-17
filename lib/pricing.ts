export const EXCHANGE_RATE = Number(process.env.NEXT_PUBLIC_EXCHANGE_RATE ?? 635)
export const MIN_ORDER_EUR = 80

export type DeliveryZone = 'abidjan' | 'ci_interior' | 'bamako'

export const ZONE_LABELS: Record<DeliveryZone, string> = {
    abidjan: 'Abidjan',
    ci_interior: 'Intérieur CI',
    bamako: 'Bamako',
}

// Frais livraison en FCFA (estimation MVP — produit standard 1-3 kg)
export const DELIVERY_FEES: Record<DeliveryZone, number> = {
    abidjan: 3_000,
    ci_interior: 5_000,
    bamako: 8_000,
}

export function getMarginRate(priceEur: number): number {
    if (priceEur < 50) return 0.15
    if (priceEur <= 200) return 0.18
    if (priceEur <= 500) return 0.15
    return 0.12
}

export interface QuoteResult {
    productFcfa: number
    marginFcfa: number
    marginRate: number
    deliveryFcfa: number
    totalFcfa: number
}

export function calculateQuote(
    priceEur: number,
    zone: DeliveryZone,
): QuoteResult {
    const marginRate = getMarginRate(priceEur)
    const productFcfa = Math.round(priceEur * EXCHANGE_RATE)
    const marginFcfa = Math.round(productFcfa * marginRate)
    const deliveryFcfa = DELIVERY_FEES[zone]
    const totalFcfa = productFcfa + marginFcfa + deliveryFcfa
    return { productFcfa, marginFcfa, marginRate, deliveryFcfa, totalFcfa }
}

export function formatFcfa(amount: number): string {
    return amount.toLocaleString('fr-FR') + ' FCFA'
}