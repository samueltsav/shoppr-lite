import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import styles from "./Layout.module.css"

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
