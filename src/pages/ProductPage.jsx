import { useState, useMemo } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ShoppingBag, Package, Star, Shield, Minus, Plus } from "lucide-react"
import { useFetch } from "../hooks/useFetch.js"
import { API_BASE } from "../utils/constants.js"
import { useCart } from "../context/CartContext.jsx"
import { formatPrice } from "../utils/helpers.js"
import StarRating from "../components/ui/StarRating.jsx"
import Badge from "../components/ui/Badge.jsx"
import ProductCard from "../components/product/ProductCard.jsx"
import Spinner from "../components/ui/Spinner.jsx"
import ErrorMessage from "../components/ui/ErrorMessage.jsx"
import styles from "./ProductPage.module.css"

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const { data: product, loading, error } = useFetch(`${API_BASE}/products/${id}`)
  const { data: allData } = useFetch(product ? `${API_BASE}/products?limit=100` : null)

  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)

  const related = useMemo(() => {
    if (!product || !allData) return []
    return (allData.products ?? [])
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product, allData])

  function handleAdd() {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (loading) return <Spinner fullPage />
  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  const images = product.images?.length > 0
    ? product.images
    : [product.thumbnail]

  const outOfStock = product.stock === 0
  const lowStock = product.stock > 0 && product.stock <= 5

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Back */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* ── Product layout ── */}
        <div className={styles.layout}>
          {/* Images */}
          <div className={styles.gallery}>
            <div className={styles.mainImg}>
              <img
                src={images[activeImg] || product.thumbnail}
                alt={product.title}
                onError={e => { e.target.src = product.thumbnail }}
              />
              {outOfStock && (
                <div className={styles.soldOutOverlay}>Out of Stock</div>
              )}
            </div>
            {images.length > 1 && (
              <div className={styles.thumbs}>
                {images.map((src, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={src} alt={`View ${i + 1}`} onError={e => { e.target.src = product.thumbnail }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.topMeta}>
              <span className={styles.category}>{product.category}</span>
              {product?.brand && <span className={styles.brand}>by {product.brand}</span>}
            </div>

            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.ratingRow}>
              <StarRating rating={product.rating ?? 0} />
              <span className={styles.ratingCount}>({Math.floor((product.rating ?? 0) * 20)} reviews)</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className={styles.originalPrice}>
                    {formatPrice(product.price / (1 - product.discountPercentage / 100))}
                  </span>
                  <Badge variant="gold">-{Math.round(product.discountPercentage)}%</Badge>
                </>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Stock */}
            <div className={styles.stockRow}>
              <Package size={15} />
              {outOfStock ? (
                <span className={styles.outOfStock}>Out of stock</span>
              ) : lowStock ? (
                <span className={styles.lowStock}>Only {product.stock} left — order soon</span>
              ) : (
                <span className={styles.inStock}>{product.stock} in stock</span>
              )}
            </div>

            {/* Qty + Add */}
            {!outOfStock && (
              <div className={styles.addRow}>
                <div className={styles.qtyControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.qtyVal}>{qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    disabled={qty >= product.stock}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
                  onClick={handleAdd}
                >
                  <ShoppingBag size={18} />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            )}

            {/* Perks */}
            <div className={styles.perks}>
              <div className={styles.perk}>
                <Shield size={14} />
                <span>Secure checkout</span>
              </div>
              <div className={styles.perk}>
                <Star size={14} />
                <span>Rated {product.rating?.toFixed(1)} / 5</span>
              </div>
              <div className={styles.perk}>
                <Package size={14} />
                <span>Free shipping over $100</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>You may also like</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
