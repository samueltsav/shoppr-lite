import { useLocation, Link } from "react-router-dom";
import { FileX } from "lucide-react";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <FileX size={64} className={styles.icon} />
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.sub}>
          The page at <code className={styles.path}>{location.pathname}</code>{" "}
          doesn"t exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.home}>
            Go to Homepage
          </Link>
          <Link to="/shop" className={styles.shop}>
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
