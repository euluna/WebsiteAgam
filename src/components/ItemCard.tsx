import React from 'react'
import { MenuItem } from '../types'
import { formatCurrency } from '../lib/currency'

export const ItemCard: React.FC<{ item: MenuItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const price = item.variants[0]?.price ?? 0
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer" onClick={onSelect}>
      <div className="w-full h-28 sm:h-36 md:h-40 bg-gray-100">
        <img src={item.image || '/images/placeholder.png'} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="font-semibold text-base sm:text-lg truncate">{item.name}</div>
        {item.description && <div className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</div>}
        <div className="mt-3 text-orange-600 font-bold">{formatCurrency(price)}</div>
      </div>
    </article>
  )
}

export default ItemCard
