import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <div>
      <nav className={styles.navContainer}>
        <div className={styles.navParagraph}>
          <p>Free shipping on orders over $ 150. Easy 30-day returns</p>
        </div>
        <div className={styles.navItems}>
          <ul className={styles.navMenu}>
            <li>
              <Link to="/" className={styles.navLogo}>
                ShopprLite
              </Link>
            </li>
            <li>
              <Link to="/shop" className={styles.navLinks}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/blog" className={styles.navLinks}>
                Blog
              </Link>
            </li>
          </ul>
          <ul className={styles.navIcons}>
            <li>
              <Link to="/search">
                <Search />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
