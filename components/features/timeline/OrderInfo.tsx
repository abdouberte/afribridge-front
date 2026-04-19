import { Order } from '@/lib/types'
import { ZONE_LABELS } from '@/lib/types'
import { formatFcfa } from '@/lib/pricing'

interface Props {
  order: Order
}

export default function OrderInfo({ order }: Props) {
  return (
    <div
      className="bg-white border-2 border-afri-border rounded-2xl overflow-hidden"
      style={{ boxShadow: '3px 3px 0 #E8D0B0' }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b-2 border-afri-border flex items-center justify-between">
        <div>
          <p className="text-xs font-extrabold text-afri-terra tracking-wider uppercase">
            {order.order_number}
          </p>
          <p className="text-xs font-semibold text-afri-text-3 mt-0.5">
            {new Date(order.created_at).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
        <p className="text-lg font-black text-afri-amber">
          {formatFcfa(order.total_fcfa)}
        </p>
      </div>

      {/* Rows */}
      <div className="px-4 py-3 flex flex-col gap-2">
        {[
          { label: 'Produit',   value: new URL(order.product_url).hostname },
          { label: 'Zone',      value: ZONE_LABELS[order.delivery_zone] },
          { label: 'Livraison', value: order.delivery_address },
          { label: 'Client',    value: order.customer_name },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-start gap-4">
            <span className="text-xs font-semibold text-afri-text-3 shrink-0">
              {label}
            </span>
            <span className="text-xs font-bold text-afri-text text-right truncate max-w-[60%]">
              {value}
            </span>
          </div>
        ))}

        {/* Lien produit */}
        <div className="flex justify-between items-center gap-4 pt-1 border-t border-afri-border">
          <span className="text-xs font-semibold text-afri-text-3 shrink-0">
            Lien
          </span>
          <a
            href={order.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-afri-terra underline truncate max-w-[60%]"
          >
            Voir le produit →
          </a>
        </div>
      </div>
    </div>
  )
}