import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE, SORT_OPTIONS, sortProducts } from "../utils/helpers";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import styles from "./ShopPage.module.css";

export default function ShopPage() {
  const { data: products, loading, error } = useFetch(`${API_BASE}/products`);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || "All";
  const sort = searchParams.get("sort") || "default";

  function setParam(key, value) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!value || value === "All" || value === "default") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    });
  }

  const categories = useMemo(() => {
    if (!products) return [];
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats.sort()];
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = products;

    if (cat !== "All") {
      list = list.filter((p) => p.category === cat);
    }
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term),
      );
    }
    return sortProducts(list, sort);
  }, [products, cat, q, sort]);

  function clearFilters() {
    setSearchParams({});
  }

  const hasActiveFilters = q || cat !== "All" || sort !== "default";

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <p className={styles.eyebrow}>Browse our collection</p>
            <h1 className={styles.title}>Shop</h1>
          </div>
          {!loading && !error && (
            <p className={styles.count}>
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
          )}
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterLabel}>
              <SlidersHorizontal size={14} /> Filters
            </h3>
            {hasActiveFilters && (
              <button className={styles.clearBtn} onClick={clearFilters}>
                <X size={12} /> Clear all
              </button>
            )}
          </div>

          {/* Search */}
          <div className={styles.filterSection}>
            <p className={styles.filterTitle}>Search</p>
            <div className={styles.searchWrapper}>
              <Search size={15} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products…"
                value={q}
                onChange={(e) => setParam("q", e.target.value)}
                className={styles.searchInput}
              />
              {q && (
                <button
                  onClick={() => setParam("q", "")}
                  className={styles.clearSearch}
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className={styles.filterSection}>
            <p className={styles.filterTitle}>Category</p>
            <div className={styles.catList}>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setParam("cat", c)}
                  className={`${styles.catBtn} ${cat === c ? styles.catActive : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className={styles.filterSection}>
            <p className={styles.filterTitle}>Sort by</p>
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className={styles.select}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Products */}
        <div className={styles.products}>
          {loading && <Spinner text="Loading products…" />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && filtered.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyIcon}>🔍</p>
              <h3 className={styles.emptyTitle}>No products found</h3>
              <p className={styles.emptySub}>
                Try adjusting your search term or filter to find what you"re
                looking for.
              </p>
              <button className={styles.emptyBtn} onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className={styles.grid}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
