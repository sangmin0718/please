const DEFAULT_BACKEND = "https://community-backend-urk6.onrender.com";

const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const envBase = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

// 배포 환경(비 localhost)에서는 무조건 배포 백엔드 사용.
// 로컬 개발만 env/local 기본값을 허용.
const API_BASE_URL = (
  isLocalHost
    ? envBase || "http://localhost:8000"
    : DEFAULT_BACKEND
).replace(/\/$/, "");

function toAbsoluteUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const normalized = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${normalized}`;
}

export { API_BASE_URL, DEFAULT_BACKEND, isLocalHost, toAbsoluteUrl };