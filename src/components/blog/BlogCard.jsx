import { Link } from 'react-router-dom'
import { Clock, Eye, ThumbsUp } from 'lucide-react'
import { truncate, readingTime, syntheticDate } from '../../utils/helpers.js'
import styles from './BlogCard.module.css'

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className={styles.card}>
      <div className={styles.tags}>
        {post.tags?.slice(0, 2).map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{truncate(post.body, 140)}</p>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Clock size={12} /> {readingTime(post.body)}
        </span>
        <span className={styles.metaItem}>
          <Eye size={12} /> {post.views?.toLocaleString()}
        </span>
        <span className={styles.metaItem}>
          <ThumbsUp size={12} /> {post.reactions?.likes}
        </span>
        <span className={styles.date}>{syntheticDate(post.id)}</span>
      </div>
    </Link>
  )
}
