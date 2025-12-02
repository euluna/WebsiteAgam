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
          {/* Social icons (left) */}
          <div className="hidden md:flex items-center gap-2 mr-2">
            {(() => {
              const s = (menuData as any).store || {}
              const wa1 = s.whatsapp1 || ''
              const wa2 = s.whatsapp2 || ''
              const tg = s.telegram || ''
              const waHref = wa1 ? `https://wa.me/${wa1.replace(/[^0-9]/g, '')}` : undefined
              const tgHref = tg ? `https://t.me/${tg.replace(/^@/, '')}` : undefined
              return (
                <>
                  {waHref && (
                    <a href={waHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="p-1 rounded bg-white/5 hover:bg-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.52 3.48A11.92 11.92 0 0012.02 1C6.48 1 2 5.48 2 11.02c0 2.01.55 3.93 1.58 5.6L2 23l6.6-1.66A11.92 11.92 0 0012.02 23c5.54 0 10.02-4.48 10.02-10.02 0-2.68-1.05-5.19-2.52-7.5zM12.02 21.2c-1.6 0-3.16-.4-4.54-1.16l-.32-.18-3.92.98.9-3.82-.2-.34A8.18 8.18 0 013.84 11c0-4.56 3.72-8.28 8.18-8.28 2.2 0 4.26.86 5.82 2.42a8.15 8.15 0 012.4 5.86c0 4.56-3.72 8.28-8.18 8.28z" />
                        <path d="M17.53 14.14c-.3-.15-1.76-.86-2.03-.95-.27-.09-.47-.15-.67.15-.2.3-.78.95-.96 1.14-.18.18-.36.21-.66.07-.3-.15-1.26-.46-2.39-1.48-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.12.3-.31.45-.47.15-.15.2-.27.3-.45.1-.18.05-.34-.02-.48-.07-.13-.67-1.6-.92-2.2-.24-.58-.48-.5-.66-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.34-.27.27-1.03 1-1.03 2.44 0 1.44 1.06 2.84 1.21 3.04.15.2 2.09 3.3 5.06 4.62 3.01 1.33 3.01.89 3.56.83.55-.06 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.41-.07-.13-.27-.2-.57-.35z" />
                      </svg>
                    </a>
                  )}
                  {tgHref && (
                    <a href={tgHref} target="_blank" rel="noreferrer" aria-label="Telegram" className="p-1 rounded bg-white/5 hover:bg-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.86 8.16 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.19-3.37-1.19-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.36 1.1 2.93.84.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85.004 1.71.115 2.51.338 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
                      </svg>
                    </a>
                  )}
                </>
              )
            })()}
          </div>

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
