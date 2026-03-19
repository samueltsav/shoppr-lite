import { AlertCircle } from "lucide-react"
import styles from "./ErrorMessage.module.css"

export default function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return (
    <div className={styles.wrapper}>
      <AlertCircle size={32} className={styles.icon} />
      <h3 className={styles.title}>Oops!</h3>
      <p className={styles.message}>{message}</p>
      <button className={styles.btn} onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  )
}
