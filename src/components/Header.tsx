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
        <div className="flex items-center gap-3">
          {/* Group: location pill */}
          {(() => {
            const mapUrl = ((menuData as any).store && (menuData as any).store.mapUrl) || 'https://www.google.com/maps/place/MHC6%2BR9H+WARKOP+AGAM+PARAMAX,+Krong+Poi+Pet,+Cambodia/data=!4m2!3m1!1s0x311b17001fca2f07:0x6f05c1abb3565737'
            return (
              <div className="flex items-center">
                <a href={mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 19l-4.95-5.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">Lokasi</span>
                </a>
              </div>
            )
          })()}

          <div className="hidden sm:block w-px h-6 bg-white/20" />

          {/* Group: cart pill (icon + total clickable together) */}
          <Link to="/cart" aria-label="Lihat keranjang" className="flex items-center gap-3 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-accent rounded-full">{totalCount}</span>
              )}
            </div>
            <div className="text-sm font-semibold text-white">{formatCurrency(summary.total || 0)}</div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
