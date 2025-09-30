/** @type {import('next').NextConfig} */
const nextConfig = {
  // ไม่มี output: 'export' อีกแล้ว
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
