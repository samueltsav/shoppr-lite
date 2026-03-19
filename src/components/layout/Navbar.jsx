import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Shoppr<span>-Lite</span>
        </Link>

        <div className={`${styles.links} ${open ? styles.open : ""}`}>
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/blog"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Blog
          </NavLink>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
          }}
        >
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.cartBtn} ${isActive ? styles.activeCart : ""}`
            }
          >
            <ShoppingBag size={16} />
            <span>Cart</span>
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </NavLink>

          <button
            className={styles.menuBtn}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
