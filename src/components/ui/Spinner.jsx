import styles from "./Spinner.module.css";

export default function Spinner({ text = "Loading…" }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ring} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
