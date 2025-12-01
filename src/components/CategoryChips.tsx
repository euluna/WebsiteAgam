import React from 'react'
import { Category } from '../types'

export const CategoryChips: React.FC<{ categories: Category[]; selected: string; onSelect: (id: string) => void }> = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto py-2">
      {categories.map(cat => (
        <button key={cat.id} onClick={() => onSelect(cat.id)} className={`px-3 py-1 rounded-full border ${selected === cat.id ? 'bg-orange-500 text-white' : 'bg-white'}`}>
          {cat.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryChips
