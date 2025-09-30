/** @type {import('next').NextConfig} */
const nextConfig = {
  // บอก Next.js ให้ export เป็น static HTML + assets ไปที่โฟลเดอร์ out/
  output: 'export',

  // ปิดการเช็ค Error build (ถ้าอยาก build ให้ผ่านเร็วขึ้น แม้มี warning/error)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
