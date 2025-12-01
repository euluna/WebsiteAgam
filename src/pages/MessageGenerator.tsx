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

  const { plainText, whatsappUrl, whatsappUrl2, telegramUrl } = generateOrderMessage(cart, checkoutData, summary)
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
              <button onClick={handleCopy} aria-label="Salin pesan" className={`block w-full text-center p-3 rounded shadow ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}>
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
          <a className="flex items-center justify-center gap-2 w-full bg-green-600 text-white p-3 rounded" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp 1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.52 3.48A11.94 11.94 0 0012.01.004 11.99 11.99 0 000 12c0 2.11.55 4.14 1.6 5.94L.5 22l3.24-1.05A11.94 11.94 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.24-6.19-3.48-8.52zM12 21.5c-1.7 0-3.35-.44-4.79-1.27l-.34-.2-1.92.62.65-1.88-.21-.33A9.49 9.49 0 012.5 12 9.5 9.5 0 0112 2.5 9.5 9.5 0 0121.5 12 9.5 9.5 0 0112 21.5z" />
              <path d="M17.6 14.2c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.19.3-.75.96-.92 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.12-.61.12-.12.27-.32.4-.48.13-.16.17-.27.27-.45.1-.18.04-.32-.02-.45-.06-.13-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.19 0-.5.07-.76.32-.27.26-1.02 1-.1 2.5.92 1.52 2.1 3.17 4.03 4.35 1.89 1.16 2.98 1.24 3.25 1.21.27-.03.86-.34.98-.67.12-.34.12-.63.09-.69-.03-.06-.27-.1-.57-.25z" />
            </svg>
            <span>WhatsApp 1 [ +62 859-4521-6880 ]</span>
          </a>
          <a className="flex items-center justify-center gap-2 w-full bg-green-700 text-white p-3 rounded" href={whatsappUrl2} target="_blank" rel="noreferrer" aria-label="WhatsApp 2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.52 3.48A11.94 11.94 0 0012.01.004 11.99 11.99 0 000 12c0 2.11.55 4.14 1.6 5.94L.5 22l3.24-1.05A11.94 11.94 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.24-6.19-3.48-8.52zM12 21.5c-1.7 0-3.35-.44-4.79-1.27l-.34-.2-1.92.62.65-1.88-.21-.33A9.49 9.49 0 012.5 12 9.5 9.5 0 0112 2.5 9.5 9.5 0 0121.5 12 9.5 9.5 0 0112 21.5z" />
              <path d="M17.6 14.2c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.19.3-.75.96-.92 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.12-.61.12-.12.27-.32.4-.48.13-.16.17-.27.27-.45.1-.18.04-.32-.02-.45-.06-.13-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.19 0-.5.07-.76.32-.27.26-1.02 1-.1 2.5.92 1.52 2.1 3.17 4.03 4.35 1.89 1.16 2.98 1.24 3.25 1.21.27-.03.86-.34.98-.67.12-.34.12-.63.09-.69-.03-.06-.27-.1-.57-.25z" />
            </svg>
            <span>WhatsApp 2 [ +855 96 290 2125 ]</span>
          </a>
          <a className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white p-3 rounded" href={telegramUrl} target="_blank" rel="noreferrer" aria-label="Telegram">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.2 8.3l-1.3 6.2c-.1.5-.4.7-.8.9-.4.2-.7.1-1-.1l-2.8-2.1-1.4 1.4c-.1.1-.2.2-.4.2l.2-2.7 5-4.5c.2-.2 0-.3-.3-.1L7.7 12.6c-.6.4-.6.9.1 1.1l2.9.9 4.8-3.2c.4-.2.8-.6.5-1.3l-1.8-3.2c-.1-.2-.5-.2-.7 0z" />
            </svg>
            <span>Telegram (@agamparamax)</span>
          </a>
        </div>

        <div className="mt-4 flex space-x-2">
          <button onClick={handleSelesai} className="flex-1 p-3 bg-neutral-100 text-primary rounded">Selesai</button>
        </div>
      </div>
    </div>
  )
}

export default MessageGenerator
