import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "../../context/CartContext.jsx"
import styles from "./Navbar.module.css"

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/blog", label: "Blog" },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  const getLinkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.linkActive : ""}`

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            Shoppr<span>Lite</span>
          </Link>

          <ul className={styles.links}>
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={getLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link to="/cart" className={styles.cartBtn}>
              <ShoppingBag size={16} />
              <span className={styles.cartLabel}>Cart</span>
              {itemCount > 0 && (
                <span className={styles.cartCount}>{itemCount}</span>
              )}
            </Link>

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}>
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`
            }
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <Link
          to="/cart"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          Cart {itemCount > 0 && `(${itemCount})`}
        </Link>
      </div>
    </>
  )
}
