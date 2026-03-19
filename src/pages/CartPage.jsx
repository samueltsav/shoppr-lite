import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  AlertTriangle,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  formatPrice,
  getImageUrl,
  SHIPPING_COST,
  SHIPPING_THRESHOLD,
  TAX_RATE,
} from "../utils/helpers";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  // Derived — never stored in state
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const remaining = SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  function handleClear() {
    clearCart();
    setConfirmClear(false);
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <ShoppingBag size={56} className={styles.emptyIcon} />
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        <p className={styles.emptySub}>
          Looks like you haven"t added anything yet.
        </p>
        <Link to="/shop" className={styles.shopBtn}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <button
            className={styles.clearBtn}
            onClick={() => setConfirmClear(true)}
          >
            <Trash2 size={14} /> Clear Cart
          </button>
        </div>

        {/* Confirm modal */}
        {confirmClear && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button
                className={styles.modalClose}
                onClick={() => setConfirmClear(false)}
              >
                <X size={18} />
              </button>
              <AlertTriangle size={32} className={styles.modalIcon} />
              <h3 className={styles.modalTitle}>Clear your cart?</h3>
              <p className={styles.modalSub}>
                This will remove all {items.length} item
                {items.length !== 1 ? "s" : ""}. This can"t be undone.
              </p>
              <div className={styles.modalActions}>
                <button
                  className={styles.modalCancel}
                  onClick={() => setConfirmClear(false)}
                >
                  Cancel
                </button>
                <button className={styles.modalConfirm} onClick={handleClear}>
                  Yes, clear cart
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.layout}>
          {/* Items */}
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.sku} className={styles.item}>
                <div className={styles.itemImg}>
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                </div>

                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemVariant}>
                    {item.color} · {item.size}
                  </p>
                  <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.qtyControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQty(item.sku, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >
                      <Minus size={13} />
                    </button>
                    <span className={styles.qtyVal}>{item.qty}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQty(item.sku, item.qty + 1)}
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <p className={styles.lineTotal}>
                    {formatPrice(item.price * item.qty)}
                  </p>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.sku)}
                    title="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            {/* Free shipping progress */}
            <div className={styles.shippingProgress}>
              {remaining > 0 ? (
                <p className={styles.shippingHint}>
                  Add <strong>{formatPrice(remaining)}</strong> more for free
                  shipping!
                </p>
              ) : (
                <p className={styles.shippingFree}>
                  🎉 You qualify for free shipping!
                </p>
              )}
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className={styles.lineItems}>
              <div className={styles.lineItem}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.lineItem}>
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className={styles.lineItem}>
                <span>Est. Tax (7.5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className={`${styles.lineItem} ${styles.totalRow}`}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button className={styles.checkoutBtn}>Proceed to Checkout</button>

            <Link to="/shop" className={styles.continueShopping}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
