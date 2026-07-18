import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 선수 사진, 스폰서 로고 등 외부 URL 이미지를 표시하기 위한 설정
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
