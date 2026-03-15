import React from 'react'
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.footerBlock}>
            <h4>Shoppr</h4>
            <p className={styles.footerParagraph}>
              Fashion, electronics and lifestyle - delivered to you door.
            </p>
          </div>
          <ul className={styles.footerBlock}>
            <h4>Shopp</h4>
            <li>
              <Link to="/shop" className={styles.footerLinks}>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/men" className={styles.footerLinks}>
                Men
              </Link>
            </li>
            <li>
              <Link to="/women" className={styles.footerLinks}>
                Women
              </Link>
            </li>
            <li>
              <Link to="/kids" className={styles.footerLinks}>
                Kids
              </Link>
            </li>
            <li>
              <Link to="/electronics" className={styles.footerLinks}>
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/footwears" className={styles.footerLinks}>
                Footwears
              </Link>
            </li>
          </ul>
          <ul className={styles.footerBlock}>
            <h4>Help</h4>
            <li>
              <Link to="/returns" className={styles.footerLinks}>
                Returns
              </Link>
            </li>
            <li>
              <Link to="/shipping" className={styles.footerLinks}>
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="/size-guide" className={styles.footerLinks}>
                Size Guide
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.footerLinks}>
                Contact Us
              </Link>
            </li>
          </ul>
          <ul className={styles.footerBlock}>
            <h4>Journal</h4>
            <li>
              <Link to="/blog" className={styles.footerLinks}>
                All Posts
              </Link>
            </li>
          </ul>
          <ul className={styles.footerBlock}>
            <h4>Company</h4>
            <li>
              <Link to="/about" className={styles.footerLinks}>
                About
              </Link>
            </li>
            <li>
              <Link to="/careers" className={styles.footerLinks}>
                Careers
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className={styles.footerLinks}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <hr className={styles.footerDivider} />
        </div>
        <div className={styles.copyright}>
          <p className={styles.copyrightParagraph}>
            &copy; 2026 Shoppr-lite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
