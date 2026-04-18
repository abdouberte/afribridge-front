import { Order } from './types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? ''

export async function getOrderByRef(ref: string): Promise<Order | null> {
    try {
        const res = await fetch(`${API_BASE}/api/orders/${ref}`, {
            next: { revalidate: 30 }, // cache 30s — refresh automatique
        })
        if (res.status === 404) return null
        if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`)
        return res.json()
    } catch {
        return null
    }
}

export async function createOrder(
    data: Omit<Order, 'id' | 'order_number' | 'created_at'>
): Promise<Order> {
    const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Impossible de créer la commande.')
    return res.json()
}

export async function getAllOrders(): Promise<Order[]> {
    try {
        const res = await fetch(`${API_BASE}/api/orders`, {
            next: { revalidate: 0 }, // pas de cache en admin
        })
        if (!res.ok) throw new Error('Impossible de charger les commandes.')
        return res.json()
    } catch {
        return []
    }
}

export async function updateOrder(
    id: string,
    data: Partial<Pick<Order, 'status' | 'tracking_number' | 'notes'>>,
): Promise<Order> {
    const res = await fetch(`${API_BASE}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Impossible de mettre à jour la commande.')
    return res.json()
}