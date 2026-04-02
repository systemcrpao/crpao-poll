import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // เพิ่มบรรทัดด้านล่างนี้ (เปลี่ยนชื่อตาม repo ของคุณ)
  basePath: "/crpao-poll",
  assetPrefix: "/crpao-poll/", 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;