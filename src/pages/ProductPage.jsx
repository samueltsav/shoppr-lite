import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Minus,
  Plus,
  Package,
  Tag,
  Star,
} from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE, formatPrice, getImageUrl } from "../utils/helpers";
import { useCart } from "../context/CartContext";
import StarRating from "../components/ui/StarRating";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const {
    data: product,
    loading,
    error,
  } = useFetch(`${API_BASE}/products/${id}`);
  const { data: allProducts } = useFetch(`${API_BASE}/products`);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState("");
  const [added, setAdded] = useState(false);

  const variants = product?.meta?.variants ?? [];

  const selectedVariant = useMemo(
    () => variants.find((v) => v.color === selectedColor),
    [variants, selectedColor],
  );

  const selectedSku = useMemo(
    () => selectedVariant?.sizes.find((s) => s.size === selectedSize),
    [selectedVariant, selectedSize],
  );

  const maxQty = selectedSku?.stock ?? 0;

  const related = useMemo(() => {
    if (!allProducts || !product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [allProducts, product]);

  function handleColorSelect(color) {
    setSelectedColor(color);
    setSelectedSize("");
    setWarn("");
  }

  function handleSizeSelect(size) {
    setSelectedSize(size);
    setWarn("");
  }

  function handleAddToCart() {
    if (!selectedColor) {
      setWarn("Please select a colour.");
      return;
    }
    if (!selectedSize) {
      setWarn("Please select a size.");
      return;
    }
    if (!selectedSku || selectedSku.stock === 0) {
      setWarn("This variant is out of stock.");
      return;
    }

    addItem(product, selectedColor, selectedSize, selectedSku.sku, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    setWarn("");
  }

  if (loading) return <Spinner text="Loading product…" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <button onClick={() => navigate(-1)} className={styles.back}>
            <ArrowLeft size={15} /> Back
          </button>
          <span className={styles.breadSep}>/</span>
          <Link to="/shop" className={styles.breadLink}>
            Shop
          </Link>
          <span className={styles.breadSep}>/</span>
          <span className={styles.breadCurrent}>{product?.name}</span>
        </div>

        {/* Main product layout */}
        <div className={styles.grid}>
          {/* Image */}
          <div className={styles.imageSection}>
            <div className={styles.imgWrapper}>
              <img
                src={getImageUrl(product?.image)}
                alt={product?.name}
                className={styles.img}
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className={styles.details}>
            <p className={styles.category}>{product?.category}</p>
            <h1 className={styles.name}>{product?.name}</h1>

            {product?.meta?.rating && (
              <div className={styles.ratingRow}>
                <StarRating rating={product.meta.rating} />
                <span className={styles.ratingText}>
                  {product.meta.rating} out of 5
                </span>
              </div>
            )}

            <p className={styles.price}>{formatPrice(product?.price)}</p>

            <div className={styles.metaRow}>
              {product?.meta?.brand && (
                <span className={styles.metaChip}>
                  <Tag size={12} /> {product.meta.brand}
                </span>
              )}
              <span className={styles.metaChip}>
                <Package size={12} />
                {product?.meta?.total_stock > 0
                  ? `${product.meta.total_stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            <p className={styles.description}>{product?.description}</p>

            {/* Colour selector */}
            {variants.length > 0 && (
              <div className={styles.selectorGroup}>
                <p className={styles.selectorLabel}>
                  Colour{" "}
                  {selectedColor && (
                    <span className={styles.selectorValue}>
                      — {selectedColor}
                    </span>
                  )}
                </p>
                <div className={styles.colorOptions}>
                  {variants.map((v) => (
                    <button
                      key={v.color}
                      onClick={() => handleColorSelect(v.color)}
                      className={`${styles.colorBtn} ${selectedColor === v.color ? styles.colorActive : ""}`}
                      title={v.color}
                      style={{ "--swatch": v.color.toLowerCase() }}
                    >
                      <span
                        className={styles.swatch}
                        style={{ background: v.color.toLowerCase() }}
                      />
                      <span className={styles.colorName}>{v.color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector — only after colour chosen */}
            {selectedColor && selectedVariant && (
              <div className={styles.selectorGroup}>
                <p className={styles.selectorLabel}>Size</p>
                <div className={styles.sizeOptions}>
                  {selectedVariant.sizes.map((s) => (
                    <button
                      key={s.sku}
                      disabled={s.stock === 0}
                      onClick={() => handleSizeSelect(s.size)}
                      className={`${styles.sizeBtn} ${selectedSize === s.size ? styles.sizeActive : ""} ${s.stock === 0 ? styles.sizeOos : ""}`}
                    >
                      {s.size}
                      {s.stock === 0 && <span className={styles.oosLine} />}
                    </button>
                  ))}
                </div>
                {selectedSku && (
                  <p className={styles.stockNote}>
                    {selectedSku.stock > 0
                      ? `${selectedSku.stock} unit${selectedSku.stock !== 1 ? "s" : ""} available`
                      : "Out of stock"}
                  </p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className={styles.selectorGroup}>
              <p className={styles.selectorLabel}>Quantity</p>
              <div className={styles.qtyControl}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className={styles.qtyBtn}
                >
                  <Minus size={14} />
                </button>
                <span className={styles.qtyDisplay}>{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(maxQty || 99, q + 1))}
                  disabled={selectedSku ? qty >= selectedSku.stock : false}
                  className={styles.qtyBtn}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Warning */}
            {warn && <p className={styles.warn}>{warn}</p>}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
            >
              <ShoppingBag size={18} />
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>You might also like</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
