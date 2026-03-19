import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((product, color, size, sku, qty) => {
    setItems(prev => {
      const existing = prev.find(i => i.sku === sku)
      if (existing) {
        return prev.map(i =>
          i.sku === sku ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [
        ...prev,
        {
          id:      product.id,
          sku,
          name:    product.name,
          image:   product.image,
          price:   Number(product.price), // coerce at the boundary
          color,
          size,
          qty,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((sku) => {
    setItems(prev => prev.filter(i => i.sku !== sku))
  }, [])

  const updateQty = useCallback((sku, qty) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.sku === sku ? { ...i, qty } : i))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
