import { CartItem, CheckoutData, CartSummary } from '../types'
import { formatCurrency } from './currency'
import menuData from '../data/menu.json'

const { name: storeName, deliveryFee } = (menuData as any).store || { name: 'Store', deliveryFee: 0 }

const generateOrderId = (): string => {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `RM-${num}`
}

export const generateOrderMessage = (
  items: CartItem[],
  checkoutData: CheckoutData,
  summary: CartSummary
): { plainText: string; whatsappUrl: string; telegramUrl: string } => {
  const { name, phone, address, paymentMethod, changeAmount, notes } = checkoutData
  const orderId = generateOrderId()

  const itemLines = items.map(item => {
    const variantLabel = item.variant.label && item.variant.label !== 'Normal' ? ` ( ${item.variant.label} )` : ''
    const itemSubtotal = item.quantity * item.variant.price
    return `- ${item.quantity}x ${item.name}${variantLabel} — ${formatCurrency(itemSubtotal)}`
  }).join('\n')

  let paymentLine: string
  if (paymentMethod === 'Cash') {
    const changeDetail = changeAmount && Number(changeAmount) > summary.total ? `Change for: ${formatCurrency(Number(changeAmount))}` : 'No change'
    paymentLine = `Payment: Cash (${changeDetail})`
  } else {
    paymentLine = `Payment: Transfer (please wait for account details)`
  }

  const plainText = `Order from: ${storeName}\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Address: ${address}\n\n` +
    `Order:\n${itemLines}\n\n` +
    `Subtotal: ${formatCurrency(summary.subtotal)}\n` +
    `Delivery fee: ${formatCurrency(deliveryFee)}\n` +
    `Total: ${formatCurrency(summary.total)}\n\n` +
    `${paymentLine}\n` +
    `Notes: ${notes || '-'}\n\n` +
    `Order ID: ${orderId}`

  const encodedMessage = encodeURIComponent(plainText)
  const whatsappUrl = `https://wa.me/${(menuData as any).store.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
  const telegramUrl = `https://t.me/share/url?text=${encodedMessage}`

  return { plainText, whatsappUrl, telegramUrl }
}
