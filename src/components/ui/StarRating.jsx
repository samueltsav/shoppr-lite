import { Star } from "lucide-react";
import styles from "./StarRating.module.css";

export default function StarRating({ rating = 0, count }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <span className={styles.wrapper}>
      {stars.map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= Math.round(rating) ? styles.filled : styles.empty}
        />
      ))}
      {count !== undefined && <span className={styles.count}>({count})</span>}
      <span className={styles.value}>{Number(rating).toFixed(1)}</span>
    </span>
  );
}
