import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            Shoppr
          </Link>
          <p>
            A curated marketplace bringing premium products to discerning
            shoppers across Nigeria and beyond.
          </p>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Navigate</p>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Info</p>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Shoppr. All rights reserved.</span>
        <span>Tecvinson Frontend Training — Cohort 2025</span>
      </div>
    </footer>
  );
}
