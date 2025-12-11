// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // (정적 사이트 변환)
  images: {
    unoptimized: true, // 이미지 최적화 기능 끄기 (에러 방지용)
  }
};

export default nextConfig;
