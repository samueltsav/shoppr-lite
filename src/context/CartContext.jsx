import { createContext, useContext, useCallback, useReducer } from 'react'

const CartContext = createContext(null)

// ─── Reducer ────────────────────────────────────────────────────────────────

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, qty } = action.payload
      const existing = state.find(item => item.id === product.id)
      if (existing) {
        return state.map(item =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + qty, product.stock) }
            : item
        )
      }
      return [...state, { ...product, qty }]
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload
      if (qty < 1) return state.filter(item => item.id !== id)
      return state.map(item => (item.id === id ? { ...item, qty } : item))
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  const addItem = useCallback((product, qty = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, qty } })
  }, [])

  const updateQty = useCallback((id, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <CartContext.Provider value={{ items, itemCount, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// ─── Custom hook ────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
