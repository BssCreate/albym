/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["vercel.app"], // Можно добавить другие домены, если изображения хранятся вне Vercel
  },
};

module.exports = nextConfig;
