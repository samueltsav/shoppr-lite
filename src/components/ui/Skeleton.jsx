import styles from './Skeleton.module.css'

export default function Skeleton({ width, height, borderRadius, className = '' }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: width || '100%',
        height: height || '1em',
        borderRadius: borderRadius || 'var(--radius-md)',
      }}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton height="240px" borderRadius="var(--radius-lg) var(--radius-lg) 0 0" />
      <div className={styles.cardBody}>
        <Skeleton height="12px" width="60%" />
        <Skeleton height="20px" width="90%" />
        <Skeleton height="14px" width="40%" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton height="22px" width="70px" />
          <Skeleton height="36px" width="36px" borderRadius="50%" />
        </div>
      </div>
    </div>
  )
}
