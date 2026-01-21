import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 현재 실행 모드(development, production)에 맞는 환경 변수를 불러옵니다.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // 1. 포트를 5173으로 고정 (네이버 개발자 센터 설정과 일치)
      port: 5173,
      // 2. 5173이 사용 중일 때 자동으로 다른 포트로 넘어가지 않도록 설정
      strictPort: true,

      // --- 프록시 설정 ---
      proxy: {
        // 프론트엔드에서 /api로 시작하는 요청을 백엔드로 전달
        '/api': {
          // .env의 VITE_BACKEND_URL을 사용하고, 없을 경우 로컬 백엔드 기본값 사용
          target: env.VITE_BACKEND_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      // Vercel 배포를 위한 빌드 최적화 설정
      chunkSizeWarningLimit: 1600,
      outDir: 'dist',
    },
  };
});
