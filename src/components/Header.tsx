import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export const Header: React.FC = () => {
  const { cart, summary } = useCart()
  return (
    <header className="bg-white border-b p-3 sticky top-0 z-20">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Warung Example</Link>
        <div className="flex items-center space-x-3">
          <Link to="/checkout" className="text-sm">Checkout</Link>
          <div className="text-sm font-semibold">{cart.length} • {summary.total ? `${summary.total} IDR` : '0'}</div>
        </div>
      </div>
    </header>
  )
}

export default Header
