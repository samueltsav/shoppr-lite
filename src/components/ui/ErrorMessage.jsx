import { AlertCircle, RefreshCw } from 'lucide-react'
import styles from './ErrorMessage.module.css'

export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className={styles.wrapper}>
      <AlertCircle size={40} className={styles.icon} />
      <h3 className={styles.title}>Oops, something went wrong</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          <RefreshCw size={15} />
          Try again
        </button>
      )}
    </div>
  )
}
