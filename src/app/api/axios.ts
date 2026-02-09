import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // 예: http://localhost:8080
  withCredentials: true,

  // ✅ 이 두 개가 핵심: axios가 자동으로 XSRF 쿠키를 읽어 헤더에 넣음
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // ✅ axios 1.x에서 XSRF 자동 첨부를 더 확실하게 켜는 옵션(버전에 따라 지원)
  withXSRFToken: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
