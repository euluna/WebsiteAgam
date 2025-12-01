import { CartItem, CheckoutData, CartSummary } from '../types'
import { formatCurrency } from './currency'
import menuData from '../data/menu.json'

const { name: storeName } = (menuData as any).store || { name: 'Store' }

const generateOrderId = (): string => {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `RM-${num}`
}

export const generateOrderMessage = (
  items: CartItem[],
  checkoutData: CheckoutData,
  summary: CartSummary
): { plainText: string; whatsappUrl: string; telegramUrl: string } => {
  const { name, phone, address, paymentMethod, hasExactChange, cashPaid, currency, notes } = checkoutData
  const orderId = generateOrderId()

  // display all prices in THB in the message body
  const displayCurrency = 'THB'
  const itemLines = items.map(item => {
    const variantLabel = item.variant.label && item.variant.label !== 'Normal' ? ` ( ${item.variant.label} )` : ''
    const itemSubtotal = item.quantity * item.variant.price
    return `- ${item.quantity}x ${item.name}${variantLabel} — ${formatCurrency(itemSubtotal, displayCurrency)}`
  }).join('\n')

  let paymentLine: string
  const paymentCurrencyTag = currency === 'IDR' ? '[IDR]' : '[THB]'
  if (paymentMethod === 'Cash') {
    if (currency === 'THB') {
      if (hasExactChange) {
        paymentLine = `Pembayaran: Tunai ${paymentCurrencyTag} (Uang pas)`
      } else if (cashPaid && Number(cashPaid) > 0) {
        const cash = Number(cashPaid)
        const change = cash - summary.subtotal
        const changeLine = change > 0 ? `Kembalian: ${formatCurrency(change, displayCurrency)}` : 'Tidak ada kembalian'
        paymentLine = `Pembayaran: Tunai ${paymentCurrencyTag} — Jumlah tunai: ${formatCurrency(cash, displayCurrency)}; ${changeLine}`
      } else {
        paymentLine = `Pembayaran: Tunai ${paymentCurrencyTag}`
      }
    } else {
      // For IDR, staff will confirm the converted amount separately
      paymentLine = `Pembayaran: Tunai ${paymentCurrencyTag} — Staff akan konfirmasi jumlah dalam IDR.`
    }
  } else {
    paymentLine = `Pembayaran: Transfer ${paymentCurrencyTag} (tunggu detail rekening)`
  }

  const noteForIDR = checkoutData.currency === 'IDR' ? 'Catatan: Harga akhir akan dikonfirmasi dalam IDR oleh staff.' : ''

    const plainText = `Order dari: ${storeName}\n\n` +
      `Nama: ${name}\n` +
      `Telepon: ${phone}\n` +
      `Alamat: ${address}\n\n` +
      `Order:\n${itemLines}\n\n` +
      `Total: ${formatCurrency(summary.subtotal, displayCurrency)}\n\n` +
      `${paymentLine}\n` +
      `Notes: ${notes || '-'}\n\n` +
      `${noteForIDR ? noteForIDR + '\n\n' : ''}`

  const encodedMessage = encodeURIComponent(plainText)
  const whatsappUrl = `https://wa.me/${(menuData as any).store.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
  const telegramUrl = `https://t.me/share/url?text=${encodedMessage}`

  return { plainText, whatsappUrl, telegramUrl }
}
