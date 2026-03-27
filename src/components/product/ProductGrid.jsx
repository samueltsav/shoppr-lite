import ProductCard from './ProductCard.jsx'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ products }) {
  return (
    <div className={styles.grid}>
      {products.map((p, i) => (
        <div key={p.id} style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
