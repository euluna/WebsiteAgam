import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useCart } from '../contexts/CartContext'
import { formatCurrency } from '../lib/currency'

const Cart: React.FC = () => {
  const navigate = useNavigate()
  const { cart, updateItemQuantity, removeItem, clearCart, summary } = useCart()

    if (cart.length === 0) {
    return (
      <div>
        <Header onBack={() => navigate(-1)} />
        <div className="p-4 max-w-2xl mx-auto text-center">
          <h2 className="text-lg font-semibold mb-2">Keranjang kosong</h2>
          <p className="mb-4">Silakan tambah item untuk memulai pesanan.</p>
          <button onClick={() => navigate('/')} className="bg-primary text-white px-4 py-2 rounded">Kembali ke Menu</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header onBack={() => navigate(-1)} />
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span className="sr-only">Keranjang</span>
        </h1>

        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-neutral p-3 rounded shadow-sm">
              <img src={item.image || '/images/placeholder.png'} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">{item.variant.label}</div>
                {item.notes && <div className="text-xs text-gray-500">Catatan: {item.notes}</div>}
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-3">
                  <button onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-10 h-10 bg-gray-100 rounded text-lg">-</button>
                  <div className="w-8 text-center text-base">{item.quantity}</div>
                  <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="w-10 h-10 bg-gray-100 rounded text-lg">+</button>
                </div>
                <div className="text-sm font-semibold mt-2">{formatCurrency(item.variant.price * item.quantity)}</div>
                <button onClick={() => {
                  if (confirm('Hapus item ini dari keranjang?')) removeItem(item.id)
                }} className="text-xs text-red-500 mt-2">Hapus</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => {
            if (confirm('Yakin ingin mengosongkan keranjang?')) clearCart()
          }} className="bg-neutral text-primary p-3 rounded">Kosongkan</button>
          <button onClick={() => navigate('/checkout')} className="flex-1 bg-primary text-white p-3 rounded font-bold">Lanjut ke Pembayaran</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
