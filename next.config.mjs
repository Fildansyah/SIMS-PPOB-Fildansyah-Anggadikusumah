/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  distDir: "build",
};

export default nextConfig;
