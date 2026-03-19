export const API_BASE = "https://developerapis.vercel.app/api";
export const IMG_BASE = "https://developerapis.vercel.app";

export const SHIPPING_THRESHOLD = 50000;
export const SHIPPING_COST = 3500;
export const TAX_RATE = 0.075; // 7.5%

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating-desc", label: "Top Rated" },
];

export function formatPrice(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Number(value));
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getImageUrl(path) {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http")) return path;
  return `${IMG_BASE}${path}`;
}

export function sortProducts(products, sort) {
  const arr = [...products];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return arr.sort((a, b) => Number(b.price) - Number(a.price));
    case "rating-desc":
      return arr.sort((a, b) => (b.meta?.rating ?? 0) - (a.meta?.rating ?? 0));
    default:
      return arr;
  }
}
