import { Star } from 'lucide-react'
import styles from './StarRating.module.css'

export default function StarRating({ rating, showValue = true, size = 14 }) {
  const full = Math.floor(rating)
  const partial = rating - full
  const empty = 5 - Math.ceil(rating)

  return (
    <div className={styles.wrapper}>
      <div className={styles.stars}>
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f${i}`} size={size} className={styles.full} fill="currentColor" />
        ))}
        {partial > 0 && (
          <span className={styles.partialWrap} style={{ '--pct': `${partial * 100}%` }}>
            <Star size={size} className={styles.partialBack} fill="currentColor" />
            <Star size={size} className={styles.partialFront} fill="currentColor" />
          </span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e${i}`} size={size} className={styles.empty} />
        ))}
      </div>
      {showValue && <span className={styles.value}>{rating?.toFixed(1)}</span>}
    </div>
  )
}
