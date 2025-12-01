import React from 'react'
import { MenuItem } from '../types'
import { formatCurrency } from '../lib/currency'

export const ItemCard: React.FC<{ item: MenuItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const price = item.variants[0]?.price ?? 0
  return (
    <article className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-3" onClick={onSelect}>
      <img src={item.image || '/images/placeholder.png'} alt={item.name} className="w-16 h-16 object-cover rounded" loading="lazy" />
      <div className="flex-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-gray-600">{item.description}</div>
      </div>
      <div className="text-orange-600 font-medium">{formatCurrency(price)}</div>
    </article>
  )
}

export default ItemCard
