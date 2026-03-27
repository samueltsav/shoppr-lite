import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Eye, ThumbsUp, ThumbsDown, Tag } from 'lucide-react'
import { useFetch } from '../hooks/useFetch.js'
import { API_BASE } from '../utils/constants.js'
import { readingTime, syntheticDate } from '../utils/helpers.js'
import Spinner from '../components/ui/Spinner.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import styles from './PostPage.module.css'

export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post, loading, error } = useFetch(`${API_BASE}/posts/${id}`)

  if (loading) return <Spinner fullPage />
  if (error) return <ErrorMessage message={error} />
  if (!post) return null

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Journal
        </button>

        <article className={styles.article}>
          {/* Tags */}
          <div className={styles.tags}>
            {post.tags?.map(tag => (
              <span key={tag} className={styles.tag}>
                <Tag size={11} /> {tag}
              </span>
            ))}
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          {/* Meta */}
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              Author #{post.userId}
            </span>
            <span className={styles.dot}>·</span>
            <span className={styles.metaItem}>
              <Clock size={13} /> {readingTime(post.body)}
            </span>
            <span className={styles.dot}>·</span>
            <span className={styles.metaItem}>{syntheticDate(post.id)}</span>
          </div>

          <div className={styles.divider} />

          {/* Body */}
          <div className={styles.body}>
            {post.body?.split('\n').map((para, i) =>
              para.trim() ? <p key={i}>{para}</p> : null
            )}
          </div>

          <div className={styles.divider} />

          {/* Reactions */}
          <div className={styles.reactions}>
            <div className={styles.reactionGroup}>
              <button className={`${styles.reactionBtn} ${styles.like}`}>
                <ThumbsUp size={16} />
                <span>{post.reactions?.likes?.toLocaleString()} Likes</span>
              </button>
              <button className={`${styles.reactionBtn} ${styles.dislike}`}>
                <ThumbsDown size={16} />
                <span>{post.reactions?.dislikes?.toLocaleString()}</span>
              </button>
            </div>
            <div className={styles.views}>
              <Eye size={14} />
              {post.views?.toLocaleString()} views
            </div>
          </div>
        </article>

        <div className={styles.backBottom}>
          <Link to="/blog" className={styles.backLink}>
            ← All posts
          </Link>
        </div>
      </div>
    </div>
  )
}
