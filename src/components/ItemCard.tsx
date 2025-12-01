import React from 'react'
import { MenuItem } from '../types'
import { formatCurrency } from '../lib/currency'

export const ItemCard: React.FC<{ item: MenuItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const price = item.variants[0]?.price ?? 0
  return (
    <article className="bg-white rounded-md shadow-sm overflow-hidden cursor-pointer" onClick={onSelect}>
      <div className="w-full aspect-square md:h-40 md:aspect-auto bg-gray-100">
        <img src={item.image || '/images/placeholder.png'} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-2">
        <div className="font-semibold text-sm sm:text-base truncate">{item.name}</div>
        {item.description && <div className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</div>}
        <div className="mt-2 text-orange-600 font-semibold text-sm">{formatCurrency(price)}</div>
      </div>
    </article>
  )
}

export default ItemCard
