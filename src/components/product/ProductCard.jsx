import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart } from 'lucide-react'
import StarRating from '../ui/StarRating.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../utils/helpers.js'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [imgError, setImgError] = useState(false)
  const [added, setAdded] = useState(false)
  const [liked, setLiked] = useState(false)

  const outOfStock = product.stock === 0

  function handleAdd(e) {
    e.preventDefault()
    if (outOfStock) return
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discountPct = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : null

  return (
    <Link to={`/shop/${product.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={imgError ? 'https://placehold.co/400x400/f0ece5/b5a898?text=No+Image' : product.thumbnail}
          alt={product.title}
          className={styles.image}
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className={styles.badges}>
          {discountPct && (
            <span className={styles.discountBadge}>-{discountPct}%</span>
          )}
          {outOfStock && (
            <span className={styles.outOfStockBadge}>Out of stock</span>
          )}
        </div>
        <button
          className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
          onClick={e => { e.preventDefault(); setLiked(l => !l) }}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <button
          className={`${styles.addBtn} ${added ? styles.addedBtn : ''} ${outOfStock ? styles.disabledBtn : ''}`}
          onClick={handleAdd}
          disabled={outOfStock}
          aria-label="Add to cart"
        >
          <ShoppingBag size={15} />
          {added ? 'Added!' : outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.meta}>
          <StarRating rating={product.rating ?? 0} showValue={false} size={12} />
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </div>
      </div>
    </Link>
  )
}
