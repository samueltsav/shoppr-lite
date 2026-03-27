import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useFetch } from '../hooks/useFetch.js'
import { API_BASE } from '../utils/constants.js'
import BlogCard from '../components/blog/BlogCard.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import styles from './BlogPage.module.css'

export default function BlogPage() {
  const { data, loading, error } = useFetch(`${API_BASE}/posts?limit=30`)
  const [q, setQ] = useState('')

  const posts = useMemo(() => {
    const all = data?.posts ?? []
    if (!q) return all
    const term = q.toLowerCase()
    return all.filter(
      p => p.title?.toLowerCase().includes(term) ||
           p.body?.toLowerCase().includes(term) ||
           p.tags?.some(t => t.toLowerCase().includes(term))
    )
  }, [data, q])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>The Shoppr Journal</h1>
            <p className={styles.sub}>Stories, ideas, and inspiration from our community</p>
          </div>
          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search posts…"
              value={q}
              onChange={e => setQ(e.target.value)}
              aria-label="Search posts"
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {loading && <Spinner fullPage />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && posts.length === 0 && (
          <EmptyState
            title="No posts found"
            message={`Nothing matched "${q}". Try a different search term.`}
            action={<button className={styles.clearBtn} onClick={() => setQ('')}>Clear search</button>}
          />
        )}
        {!loading && !error && posts.length > 0 && (
          <>
            <p className={styles.count}>{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
            <div className={styles.grid}>
              {posts.map((post, i) => (
                <div key={post.id} style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
