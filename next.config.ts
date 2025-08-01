import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/**`),
    ],
  },
};

export default nextConfig;
