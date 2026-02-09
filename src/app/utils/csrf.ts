import axios from 'axios';

const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

const csrfClient = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL, // Proxy 사용을 위해 제거
  withCredentials: true,
});

let csrfPromise: Promise<void> | null = null;

export const getCsrfToken = () => {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CSRF_COOKIE_NAME}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

// ✅ force=true면 쿠키가 있어도 한번 더 발급(GET) 받아서 최신화
export const ensureCsrfToken = async (force = false) => {
  if (!force && getCsrfToken()) return;

  if (!csrfPromise) {
    csrfPromise = csrfClient
      // ✅ 캐시/중복 방지용 쿼리 하나 붙이기(가끔 브라우저 캐시로 Set-Cookie 안 타는 느낌 방지)
      .get('/api/v1/csrf', {
        params: { t: Date.now() },
        headers: { 'Cache-Control': 'no-cache' },
      })
      .then(() => undefined)
      .finally(() => {
        csrfPromise = null;
      });
  }

  await csrfPromise;
};
