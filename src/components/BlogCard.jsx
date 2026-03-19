import { Link } from "react-router-dom";
import { Clock, Eye, Heart } from "lucide-react";
import { formatDate } from "../utils/helpers";
import styles from "./BlogCard.module.css";

export default function BlogCard({ post }) {
  const snippet = post.content?.slice(0, 140) + "…";

  return (
    <Link to={`/blog/${post.id}`} className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          src={post.thumbnail}
          alt={post.title}
          className={styles.img}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          {post.meta?.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.snippet}>{snippet}</p>

        <div className={styles.meta}>
          <span className={styles.author}>By {post.author}</span>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <Clock size={12} /> {formatDate(post.publishedAt)}
            </span>
            <span className={styles.stat}>
              <Eye size={12} /> {post.meta?.views ?? 0}
            </span>
            <span className={styles.stat}>
              <Heart size={12} /> {post.meta?.likes ?? 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
