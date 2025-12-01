import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import menuData from '../data/menu.json'
import { CartItem, Variant, CartSummary, CheckoutData } from '../types'

const CART_STORAGE_KEY = 'order_builder_cart'
const USER_DETAILS_KEY = 'order_builder_user'
const CART_TTL_MS = 24 * 60 * 60 * 1000

const ALL_ITEMS = (menuData as any).categories.flatMap((c: any) => c.items)

type CartContextValue = {
  cart: CartItem[]
  addItem: (itemId: string, variant: Variant, quantity: number, notes?: string) => void
  removeItem: (id: string) => void
  updateItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  summary: CartSummary
  saveUserDetails: (d: CheckoutData) => void
  savedDetails?: Partial<CheckoutData>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.ts && (Date.now() - parsed.ts) < CART_TTL_MS) {
          setCart(parsed.cart || [])
        }
      }
    } catch (e) {
      console.warn('Failed to load cart', e)
    }
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ ts: Date.now(), cart }))
    } catch (e) {
      console.warn('Failed to save cart', e)
    }
  }, [cart, isReady])

  const addItem = useCallback((itemId: string, variant: Variant, quantity: number, notes?: string) => {
    const itemDetails = ALL_ITEMS.find((i: any) => i.id === itemId)
    if (!itemDetails) return
    const newItem: CartItem = {
      id: `${itemId}-${variant.id}-${Date.now()}`,
      itemId,
      name: itemDetails.name,
      variant,
      quantity,
      notes: notes || '',
      image: itemDetails.image
    }
    setCart(prev => [...prev, newItem])
  }, [])

  const removeItem = useCallback((id: string) => setCart(prev => prev.filter(i => i.id !== id)), [])

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const saveUserDetails = useCallback((d: CheckoutData) => {
    try { localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(d)) } catch (e) { }
  }, [])

  const savedDetails = useMemo(() => {
    try {
      const raw = localStorage.getItem(USER_DETAILS_KEY)
      return raw ? JSON.parse(raw) : undefined
    } catch { return undefined }
  }, [])

  const summary = useMemo<CartSummary>(() => {
    const subtotal = cart.reduce((acc, it) => acc + it.variant.price * it.quantity, 0)
    const deliveryFee = subtotal > 0 ? (menuData as any).store.deliveryFee : 0
    return { subtotal, deliveryFee, total: subtotal + deliveryFee }
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItemQuantity, clearCart, summary, saveUserDetails, savedDetails }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
