import styles from "./Spinner.module.css"

export default function Spinner({ size = "md", fullPage = false }) {
  const spinner = (
    <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label="Loading" />
  )

  if (fullPage) {
    return <div className={styles.fullPage}>{spinner}</div>
  }

  return spinner
}
