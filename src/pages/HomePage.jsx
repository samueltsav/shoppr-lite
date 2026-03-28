import { useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ShoppingBag, Truck, RotateCcw, Star } from "lucide-react"
import { useFetch } from "../hooks/useFetch.js"
import { API_BASE, CATEGORIES } from "../utils/constants.js"
import ProductCard from "../components/product/ProductCard.jsx"
import BlogCard from "../components/blog/BlogCard.jsx"
import Spinner from "../components/ui/Spinner.jsx"
import styles from "./HomePage.module.css"

const FEATURED_CATS = [
  { label: "Beauty", value: "beauty", emoji: "✨" },
  { label: "Electronics", value: "smartphones", emoji: "📱" },
  { label: "Men's Fashion", value: "mens-shirts", emoji: "👔" },
  { label: "Women's Fashion", value: "womens-dresses", emoji: "👗" },
  { label: "Home Decor", value: "home-decoration", emoji: "🏠" },
  { label: "Skin Care", value: "skin-care", emoji: "🌿" },
]

export default function HomePage() {
  const { data: productsData, loading: pLoading } = useFetch(`${API_BASE}/products?limit=100`)
  const { data: postsData, loading: bLoading } = useFetch(`${API_BASE}/posts?limit=6`)

  const featured = useMemo(() => {
    const all = productsData?.products ?? []
    return all
      .filter(p => p.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8)
  }, [productsData])

  const posts = useMemo(() => (postsData?.posts ?? []).slice(0, 3), [postsData])

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroPill}>Latest Collection 2026</div>
          <h1 className={styles.heroTitle}>
            Discover Products<br />
            <em>You"ll Love</em>
          </h1>
          <p className={styles.heroSub}>
            Curated selection across beauty, fashion, tech & home.
            Quality you can trust, prices you"ll appreciate.
          </p>
          <div className={styles.heroActions}>
            <Link to="/shop" className={styles.heroBtn}>
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/blog" className={styles.heroLink}>
              Read the Journal
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}><strong>194+</strong><span>Products</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>4.8★</strong><span>Avg Rating</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><strong>Free</strong><span>Shipping $100+</span></div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroGrid}>
            {[
              "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
              "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Plus/thumbnail.png",
              "https://cdn.dummyjson.com/products/images/womens-dresses/Green%20Floral%20Dress/thumbnail.png",
              "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png",
            ].map((src, i) => (
              <div key={i} className={`${styles.heroImg} ${styles[`heroImg${i}`]}`}>
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className={styles.trustBar}>
        {[
          { icon: <Truck size={20} />, label: "Free Shipping", sub: "On orders over $100" },
          { icon: <RotateCcw size={20} />, label: "Easy Returns", sub: "30-day return policy" },
          { icon: <Star size={20} />, label: "Top Rated", sub: "Curated 4.5+ products" },
          { icon: <ShoppingBag size={20} />, label: "194+ Items", sub: "Across all categories" },
        ].map(({ icon, label, sub }) => (
          <div key={label} className={styles.trustItem}>
            <span className={styles.trustIcon}>{icon}</span>
            <div>
              <div className={styles.trustLabel}>{label}</div>
              <div className={styles.trustSub}>{sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Categories ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <Link to="/shop" className={styles.seeAll}>View all <ArrowRight size={14} /></Link>
          </div>
          <div className={styles.catGrid}>
            {FEATURED_CATS.map(cat => (
              <Link
                key={cat.value}
                to={`/shop?cat=${cat.value}`}
                className={styles.catCard}
              >
                <span className={styles.catEmoji}>{cat.emoji}</span>
                <span className={styles.catLabel}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Top Rated</h2>
            <Link to="/shop?sort=rating-desc" className={styles.seeAll}>
              See all <ArrowRight size={14} />
            </Link>
          </div>
          {pLoading ? (
            <div className={styles.spinnerWrap}><Spinner size="lg" /></div>
          ) : (
            <div className={styles.featuredGrid}>
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Banner ── */}
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerEyebrow}>Limited Time</p>
          <h2 className={styles.bannerTitle}>Free Shipping on Orders Over $100</h2>
          <p className={styles.bannerSub}>
            Stock up on your favourites and let us handle the rest.
          </p>
          <Link to="/shop" className={styles.bannerBtn}>Start Shopping</Link>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>From the Journal</h2>
            <Link to="/blog" className={styles.seeAll}>All posts <ArrowRight size={14} /></Link>
          </div>
          {bLoading ? (
            <div className={styles.spinnerWrap}><Spinner /></div>
          ) : (
            <div className={styles.blogGrid}>
              {posts.map(post => <BlogCard key={post.id} post={post} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
