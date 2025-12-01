import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { generateOrderMessage } from '../lib/generateMessage'
import Header from '../components/Header'

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
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      // ignore
    }
  }

  const handleSelesai = () => {
    if (confirm('Kosongkan keranjang dan kembali ke beranda?')) {
      clearCart();
      navigate('/')
    }
  }

  return (
    <div>
      <Header onBack={() => navigate(-1)} />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">Pesan Pesanan</h1>
          <div>
            <pre className="whitespace-pre-wrap bg-white p-3 rounded border">{plainText}</pre>
            <div className="mt-3">
              <button onClick={handleCopy} aria-label="Salin pesan" className={`block w-full text-center p-3 rounded shadow ${copied ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                <div className="flex items-center justify-center gap-2">
                  {!copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M8 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v7a2 2 0 002 2h6a2 2 0 002-2v-1h1a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H8z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-medium">{copied ? 'Disalin' : 'Salin'}</span>
                </div>
              </button>
            </div>
          </div>

        <div className="mt-4 space-y-2">
          <a className="block w-full text-center bg-green-600 text-white p-3 rounded" href={whatsappUrl} target="_blank" rel="noreferrer">Buka WhatsApp</a>
          <a className="block w-full text-center bg-blue-600 text-white p-3 rounded" href={telegramUrl} target="_blank" rel="noreferrer">Bagikan ke Telegram</a>
        </div>

        <div className="mt-4 flex space-x-2">
          <button onClick={handleSelesai} className="flex-1 p-3 bg-gray-200 rounded">Selesai</button>
        </div>
      </div>
    </div>
  )
}

export default MessageGenerator
