import { Link, useLocation } from 'react-router-dom'
import { Compass } from 'lucide-react'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.iconWrap}>
          <Compass size={56} className={styles.icon} />
        </div>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          The page you're looking for —{' '}
          <code className={styles.path}>{pathname}</code>{' '}
          — doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>Go to Homepage</Link>
          <Link to="/shop" className={styles.shopBtn}>Browse Shop</Link>
        </div>
      </div>
    </div>
  )
}
