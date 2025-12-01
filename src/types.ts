export type Variant = { id: string; label: string; price: number }

export type MenuItem = {
  id: string
  name: string
  description?: string
  image?: string
  variants: Variant[]
}

export type Category = {
  id: string
  name: string
  items: MenuItem[]
}

export type CartItem = {
  id: string
  itemId: string
  name: string
  variant: Variant
  quantity: number
  notes?: string
  image?: string
}

export type CartSummary = { subtotal: number; deliveryFee: number; total: number }

export type CheckoutData = {
  name: string
  phone: string
  address: string
  paymentMethod: 'Cash' | 'Transfer'
  needChange?: boolean
  changeAmount?: number
  notes?: string
  saveDetails?: boolean
}
