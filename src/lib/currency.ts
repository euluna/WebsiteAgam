import menuData from '../data/menu.json'

const { currency, currencyFormat } = (menuData as any).store || { currency: 'IDR', currencyFormat: 'k' }

export const formatCurrency = (amount: number): string => {
  if (currencyFormat === 'k') {
    const thousands = Math.round(amount / 1000)
    return `${thousands}k`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount)
}
