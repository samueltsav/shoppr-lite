import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Eye, Heart, MessageCircle, Clock } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE, formatDate } from "../utils/helpers";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import styles from "./PostPage.module.css";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, loading, error } = useFetch(`${API_BASE}/blogs/${id}`);

  if (loading) return <Spinner text="Loading article…" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Back */}
        <button onClick={() => navigate(-1)} className={styles.back}>
          <ArrowLeft size={15} /> Back to Blog
        </button>

        {/* Thumbnail */}
        {post?.thumbnail && (
          <div className={styles.thumbnail}>
            <img
              src={post.thumbnail}
              alt={post.title}
              className={styles.thumbImg}
            />
          </div>
        )}

        {/* Tags */}
        <div className={styles.tags}>
          {post?.meta?.tags?.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className={styles.title}>{post?.title}</h1>

        {/* Meta */}
        <div className={styles.meta}>
          <span className={styles.author}>
            By <strong>{post?.author}</strong>
          </span>
          <span className={styles.sep}>·</span>
          <span className={styles.date}>
            <Clock size={13} />{" "}
            {post?.publishedAt ? formatDate(post.publishedAt) : ""}
          </span>
          <span className={styles.sep}>·</span>
          <span className={styles.stat}>
            <Eye size={13} /> {post?.meta?.views ?? 0} views
          </span>
          <span className={styles.stat}>
            <Heart size={13} /> {post?.meta?.likes ?? 0} likes
          </span>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {post?.content
            ?.split("\n")
            .map((para, i) => (para.trim() ? <p key={i}>{para}</p> : null))}
        </div>

        {/* Comments */}
        {post?.meta?.comments?.length > 0 && (
          <section className={styles.comments}>
            <h2 className={styles.commentsTitle}>
              <MessageCircle size={18} />
              Comments ({post.meta.comments.length})
            </h2>
            <div className={styles.commentList}>
              {post.meta.comments.map((c) => (
                <div key={c.id} className={styles.comment}>
                  <div className={styles.commentAvatar}>
                    {c.user?.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.commentBody}>
                    <p className={styles.commentUser}>{c.user}</p>
                    <p className={styles.commentText}>{c.text}</p>
                    <span className={styles.commentLikes}>
                      <Heart size={11} /> {c.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className={styles.backBottom}>
          <Link to="/blog" className={styles.backLink}>
            ← All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
