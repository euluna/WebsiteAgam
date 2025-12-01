import React from 'react'
import { Category } from '../types'

export const CategoryChips: React.FC<{ categories: Category[]; selected: string; onSelect: (id: string) => void; compact?: boolean; }> = ({ categories, selected, onSelect, compact }) => {
  // Renders a vertical list intended for a left sidebar. Container controls width now.
  return (
    <nav className={`bg-white border rounded p-2 space-y-1 w-full`}> 
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`block w-full text-left px-3 py-2 rounded ${selected === cat.id ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}>
          <span className={`${compact ? 'text-xs' : 'text-sm'} truncate block whitespace-nowrap`}>{cat.name}</span>
        </button>
      ))}
    </nav>
  )
}

export default CategoryChips
