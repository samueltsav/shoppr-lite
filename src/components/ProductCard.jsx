import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import StarRating from "./ui/StarRating"
import { formatPrice, getImageUrl } from "../utils/helpers"
import styles from "./ProductCard.module.css"

export default function ProductCard({ product }) {
  const imgSrc = getImageUrl(product.image)

  return (
    <Link to={`/shop/${product.id}`} className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          src={imgSrc}
          alt={product.name}
          className={styles.img}
          onError={e => { e.target.src = "/placeholder.svg" }}
        />
        <div className={styles.overlay}>
          <span className={styles.viewBtn}>
            <ShoppingBag size={16} />
            View Product
          </span>
        </div>
        {product.meta?.total_stock === 0 && (
          <span className={styles.soldOut}>Sold Out</span>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.bottom}>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          {product.meta?.rating && (
            <StarRating rating={product.meta.rating} />
          )}
        </div>
      </div>
    </Link>
  )
}
