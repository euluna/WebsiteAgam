import menuData from '../data/menu.json'

const { currency: storeCurrency, currencyFormat } = (menuData as any).store || { currency: 'IDR', currencyFormat: 'k' }

// formatCurrency supports an optional currency override; if provided, it will use Intl formatting
export const formatCurrency = (amount: number, currencyOverride?: string): string => {
  const useCurrency = currencyOverride || storeCurrency
  // If the store's currencyFormat uses shorthand 'k' and no override is provided, keep that behavior
  if (!currencyOverride && currencyFormat === 'k') {
    const thousands = Math.round(amount / 1000)
    return `${thousands}k`
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: useCurrency,
      minimumFractionDigits: 0
    }).format(amount)
  } catch (e) {
    // Fallback: show raw amount with currency code
    return `${useCurrency} ${amount}`
  }
}
