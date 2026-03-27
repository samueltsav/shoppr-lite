import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, Minus, Plus, X, ChevronRight, AlertTriangle } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/helpers.js'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE } from '../utils/constants.js'
import EmptyState from '../components/ui/EmptyState.jsx'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart } = useCart()
  const [confirmClear, setConfirmClear] = useState(false)
  const [imgErrors, setImgErrors] = useState({})

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  )
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  function handleClear() {
    if (!confirmClear) { setConfirmClear(true); return }
    clearCart()
    setConfirmClear(false)
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Your Cart</h1>
          <EmptyState
            icon={<ShoppingBag size={48} />}
            title="Your cart is empty"
            message="Looks like you haven't added anything yet. Head to the shop and find something you love."
            action={
              <Link to="/shop" className={styles.shopLink}>
                Browse Products <ChevronRight size={16} />
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Your Cart</h1>
          <button
            className={`${styles.clearBtn} ${confirmClear ? styles.clearBtnConfirm : ''}`}
            onClick={handleClear}
            onBlur={() => setConfirmClear(false)}
          >
            <AlertTriangle size={14} />
            {confirmClear ? 'Confirm clear?' : 'Clear cart'}
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className={styles.shippingBar}>
            <p className={styles.shippingMsg}>
              Add <strong>{formatPrice(remaining)}</strong> more to unlock free shipping!
            </p>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
        {subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
          <div className={`${styles.shippingBar} ${styles.shippingBarFree}`}>
            🎉 You've unlocked free shipping!
          </div>
        )}

        <div className={styles.layout}>
          {/* ── Items ── */}
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.id} className={styles.item}>
                <Link to={`/shop/${item.id}`} className={styles.itemImg}>
                  <img
                    src={imgErrors[item.id] ? 'https://placehold.co/80x80/f0ece5/b5a898?text=?' : item.thumbnail}
                    alt={item.title}
                    onError={() => setImgErrors(e => ({ ...e, [item.id]: true }))}
                  />
                </Link>
                <div className={styles.itemInfo}>
                  <Link to={`/shop/${item.id}`} className={styles.itemName}>{item.title}</Link>
                  <div className={styles.itemCat}>{item.category}</div>
                  <div className={styles.itemBottom}>
                    <div className={styles.qtyCtrl}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className={styles.qtyNum}>{item.qty}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        disabled={item.qty >= item.stock}
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className={styles.itemPrice}>{formatPrice(item.price * item.qty)}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Summary ── */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={shipping === 0 ? styles.free : ''}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Estimated Tax (7.5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button className={styles.checkoutBtn}>
              Proceed to Checkout <ChevronRight size={18} />
            </button>
            <Link to="/shop" className={styles.continueShopping}>
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
