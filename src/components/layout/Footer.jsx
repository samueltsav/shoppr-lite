import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>Shoppr<span>Lite</span></div>
          <p>
            We are reliable and second to none. Quality products,
            honest prices, and a seamless shopping experience — every time.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop?cat=beauty">Beauty</Link></li>
            <li><Link to="/shop?cat=laptops">Electronics</Link></li>
            <li><Link to="/shop?cat=mens-shirts">Men's</Link></li>
            <li><Link to="/shop?cat=womens-dresses">Women's</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">About</Link></li>
            <li><Link to="/blog">Journal</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Support</h4>
          <ul>
            <li><Link to="/">Help Centre</Link></li>
            <li><Link to="/">Returns</Link></li>
            <li><Link to="/">Shipping</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Shoppr-lite. All rights reserved.</span>
        <span>Built with React | Powered by DummyJSON</span>
      </div>
    </footer>
  )
}
