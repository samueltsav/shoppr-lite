import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE } from "../utils/helpers";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import styles from "./BlogPage.module.css";

export default function BlogPage() {
  const { data: posts, loading, error } = useFetch(`${API_BASE}/blogs`);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!posts) return [];
    if (!q.trim()) return posts;
    const term = q.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.author.toLowerCase().includes(term) ||
        p.meta?.tags?.some((t) => t.toLowerCase().includes(term)),
    );
  }, [posts, q]);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <p className={styles.eyebrow}>From our journal</p>
            <h1 className={styles.title}>Blog</h1>
          </div>
          <div className={styles.search}>
            <Search size={15} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {loading && <Spinner text="Loading articles…" />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && filtered.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>📰</p>
            <h3 className={styles.emptyTitle}>No articles found</h3>
            <p className={styles.emptySub}>Try a different search term.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className={styles.count}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className={styles.grid}>
              {filtered.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
