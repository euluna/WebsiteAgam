import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import menuData from '../data/menu.json'
import { formatCurrency } from '../lib/currency'

export const Header: React.FC = () => {
  const { cart, summary } = useCart()
  const storeName = (menuData as any).store?.name || 'Toko'
  return (
    <header className="bg-white border-b p-3 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">{storeName}</Link>
        <div className="flex items-center space-x-3">
          <Link to="/checkout" className="text-sm">Keranjang</Link>
          <div className="text-sm font-semibold">{cart.length} • {formatCurrency(summary.total || 0)}</div>
        </div>
      </div>
    </header>
  )
}

export default Header
