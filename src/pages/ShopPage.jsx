import { useMemo, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useFetch } from "../hooks/useFetch.js"
import { API_BASE, CATEGORIES, SORT_OPTIONS } from "../utils/constants.js"
import ProductGrid from "../components/product/ProductGrid.jsx"
import { SkeletonGrid } from "../components/ui/SkeletonCard.jsx"
import ErrorMessage from "../components/ui/ErrorMessage.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"
import styles from "./ShopPage.module.css"

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get("q") || ""
  const cat = searchParams.get("cat") || "all"
  const sort = searchParams.get("sort") || "featured"

  const { data, loading, error } = useFetch(`${API_BASE}/products?limit=100`)

  const setParam = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (!value || value === "all" || value === "featured") {
        next.delete(key)
      } else {
        next.set(key, value)
      }
      return next
    })
  }, [setSearchParams])

  const clearFilters = useCallback(() => setSearchParams({}), [setSearchParams])

  const filtered = useMemo(() => {
    let products = data?.products ?? []
    if (cat !== "all") products = products.filter(p => p.category === cat)
    if (q) {
      const term = q.toLowerCase()
      products = products.filter(
        p => p.title?.toLowerCase().includes(term) ||
             p.description?.toLowerCase().includes(term)
      )
    }
    switch (sort) {
      case "price-asc":  return [...products].sort((a, b) => a.price - b.price)
      case "price-desc": return [...products].sort((a, b) => b.price - a.price)
      case "rating-desc": return [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      default: return products
    }
  }, [data, cat, q, sort])

  const hasFilters = q || cat !== "all" || sort !== "featured"
  const activeCatLabel = CATEGORIES.find(c => c.value === cat)?.label ?? "All"

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>
              {cat !== "all" ? activeCatLabel : "All Products"}
            </h1>
            <p className={styles.count}>
              {loading ? "…" : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          {/* Search */}
          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search products…"
              value={q}
              onChange={e => setParam("q", e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <div className={styles.filterHeading}>
              <SlidersHorizontal size={14} /> Filters
              {hasFilters && (
                <button className={styles.clearBtn} onClick={clearFilters}>
                  <X size={12} /> Clear
                </button>
              )}
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterLabel}>Sort by</h4>
              {SORT_OPTIONS.map(o => (
                <label key={o.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sort"
                    value={o.value}
                    checked={sort === o.value}
                    onChange={() => setParam("sort", o.value)}
                    className={styles.radio}
                  />
                  {o.label}
                </label>
              ))}
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterLabel}>Category</h4>
              <div className={styles.catList}>
                {CATEGORIES.map(c => (
                  <button
                    key={c.value}
                    className={`${styles.catBtn} ${cat === c.value ? styles.catBtnActive : ""}`}
                    onClick={() => setParam("cat", c.value)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className={styles.main}>
          {loading && <SkeletonGrid count={12} />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && filtered.length === 0 && (
            <EmptyState
              title="No products found"
              message={`We couldn"t find anything matching "${q || activeCatLabel}". Try adjusting your filters or searching for something else.`}
              action={<button className={styles.resetBtn} onClick={clearFilters}>Clear filters</button>}
            />
          )}
          {!loading && !error && filtered.length > 0 && (
            <ProductGrid products={filtered} />
          )}
        </main>
      </div>
    </div>
  )
}
