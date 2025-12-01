import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import menuData from '../data/menu.json'
import { formatCurrency } from '../lib/currency'

export const Header: React.FC<{ onToggleCategories?: () => void; onBack?: () => void }> = ({ onToggleCategories, onBack }) => {
  const { cart, summary } = useCart()
  const totalCount = cart.reduce((acc, it) => acc + (it.quantity || 0), 0)
  const storeName = (menuData as any).store?.name || 'Toko'
  return (
    <header className="bg-primary p-3 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button aria-label="Kembali" onClick={onBack} className="w-10 h-10 rounded-sm bg-white text-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L8.414 11H17a1 1 0 110 2H8.414l3.879 3.879a1 1 0 01-1.414 1.414l-5.586-5.586a1 1 0 010-1.414l5.586-5.586a1 1 0 111.414 1.414L8.414 11H17a1 1 0 110 2H8.414l3.879 3.879a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          {onToggleCategories && (
            <button aria-label="Toggle categories" onClick={onToggleCategories} className="md:hidden w-10 h-10 rounded-sm bg-white text-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <Link to="/" className="font-bold text-lg text-white">{storeName}</Link>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/cart" className="text-sm text-white">Keranjang</Link>
          <div className="text-sm font-semibold text-white">{totalCount} • {formatCurrency(summary.total || 0)}</div>
        </div>
      </div>
    </header>
  )
}

export default Header
