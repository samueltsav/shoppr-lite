import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE } from "../utils/helpers";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/ui/Spinner";
import styles from "./HomePage.module.css";

const FEATURES = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₦50,000" },
  { icon: Shield, title: "Secure Payments", desc: "256-bit SSL encryption" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free policy" },
  {
    icon: ShoppingBag,
    title: "Premium Quality",
    desc: "Curated for excellence",
  },
];

export default function HomePage() {
  const { data: products, loading: pLoading } = useFetch(
    `${API_BASE}/products`,
  );
  const { data: posts, loading: bLoading } = useFetch(`${API_BASE}/blogs`);

  const featured = useMemo(() => products?.slice(0, 4) ?? [], [products]);
  const latestPosts = useMemo(() => posts?.slice(0, 3) ?? [], [posts]);

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>New Season Arrivals</p>
          <h1 className={styles.heroTitle}>
            Discover <em>Premium</em>
            <br />
            Products
          </h1>
          <p className={styles.heroSub}>
            Carefully curated items from top brands, delivered to your door
            across Nigeria.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/shop" className={styles.btnPrimary}>
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link to="/blog" className={styles.btnGhost}>
              Read Blog
            </Link>
          </div>
        </div>
        <div className={styles.heroDecor}>
          <div className={styles.heroShape} />
          <div className={styles.heroShape2} />
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.featureCard}>
                <Icon size={24} className={styles.featureIcon} />
                <div>
                  <h4 className={styles.featureTitle}>{title}</h4>
                  <p className={styles.featureDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Hand-picked for you</p>
              <h2 className={styles.sectionTitle}>Featured Products</h2>
            </div>
            <Link to="/shop" className={styles.seeAll}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {pLoading ? (
            <Spinner text="Loading products…" />
          ) : (
            <div className={styles.productGrid}>
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Banner ── */}
      <section className={styles.banner}>
        <div className={styles.container}>
          <div className={styles.bannerInner}>
            <div>
              <p className={styles.bannerEyebrow}>Limited Time</p>
              <h2 className={styles.bannerTitle}>
                Free shipping on orders over ₦50,000
              </h2>
              <p className={styles.bannerSub}>
                Shop today and enjoy complimentary delivery nationwide.
              </p>
            </div>
            <Link to="/shop" className={styles.bannerBtn}>
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Blog ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>From our journal</p>
              <h2 className={styles.sectionTitle}>Latest Articles</h2>
            </div>
            <Link to="/blog" className={styles.seeAll}>
              All Articles <ArrowRight size={14} />
            </Link>
          </div>

          {bLoading ? (
            <Spinner text="Loading articles…" />
          ) : (
            <div className={styles.blogGrid}>
              {latestPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
