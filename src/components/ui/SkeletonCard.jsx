import styles from "./SkeletonCard.module.css"

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.line} style={{ width: "60%" }} />
        <div className={styles.line} style={{ width: "90%" }} />
        <div className={styles.line} style={{ width: "40%" }} />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
