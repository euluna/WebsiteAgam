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
          <button onClick={() => navigate('/')} className="bg-orange-500 text-white px-4 py-2 rounded">Kembali ke Menu</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header onBack={() => navigate(-1)} />
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Keranjang</h1>

        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
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
                <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 mt-2">Hapus</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(summary.subtotal)}</span></div>
          <div className="flex justify-between font-semibold mt-2"><span>Total</span><span>{formatCurrency(summary.subtotal)}</span></div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => {
            if (confirm('Yakin ingin mengosongkan keranjang?')) clearCart()
          }} className="bg-gray-200 p-3 rounded">Kosongkan</button>
          <button onClick={() => navigate('/checkout')} className="flex-1 bg-orange-500 text-white p-3 rounded font-bold">Lanjut ke Pembayaran</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
