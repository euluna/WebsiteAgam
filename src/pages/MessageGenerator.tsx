import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { generateOrderMessage } from '../lib/generateMessage'

export const MessageGenerator: React.FC = () => {
  const navigate = useNavigate()
  const { cart, summary, clearCart } = useCart()
  const raw = sessionStorage.getItem('finalCheckoutData')
  const checkoutData = raw ? JSON.parse(raw) : null

  if (!checkoutData) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <p>Tidak ada data checkout. Silakan selesaikan pembayaran terlebih dahulu.</p>
        <button onClick={() => navigate('/checkout')} className="mt-2 text-blue-600">Ke Pembayaran</button>
      </div>
    )
  }

  const { plainText, whatsappUrl, telegramUrl } = generateOrderMessage(cart, checkoutData, summary)

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Pesan Pesanan</h1>
      <pre className="whitespace-pre-wrap bg-white p-3 rounded border">{plainText}</pre>

      <div className="mt-4 space-y-2">
        <a className="block w-full text-center bg-green-600 text-white p-3 rounded" href={whatsappUrl} target="_blank" rel="noreferrer">Buka WhatsApp</a>
        <a className="block w-full text-center bg-blue-600 text-white p-3 rounded" href={telegramUrl} target="_blank" rel="noreferrer">Bagikan ke Telegram</a>
      </div>

      <div className="mt-4 flex space-x-2">
        <button onClick={() => { clearCart(); navigate('/') }} className="flex-1 p-3 bg-gray-200 rounded">Selesai</button>
      </div>
    </div>
  )
}

export default MessageGenerator
