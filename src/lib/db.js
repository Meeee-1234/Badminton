// src/lib/db.js
import mysql from "mysql2/promise";

/**
 * ใช้ ENV ชื่อมาตรฐาน และรองรับพอร์ต/option เพิ่มเติม
 * ตั้งค่าใน Vercel: MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD
 * (ถ้าโฮสต์ของคุณต้องการ SSL, ดูตัวอย่างคอมเมนต์ด้านล่าง)
 */
const config = {
  host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
  user: process.env.MYSQL_USER || process.env.DB_USER || "root",
  password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "badminton",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // ถ้า provider ของคุณต้องการ SSL (เช่น PlanetScale/Hostinger บางแพลน) ให้เปิดคอมเมนต์นี้:
  // ssl: { rejectUnauthorized: true },
};

/**
 * สร้าง pool แบบ singleton เพื่อไม่สร้างคอนเนคชันใหม่ทุก request (เหมาะกับ serverless)
 */
let _pool;
export function getPool() {
  if (!_pool) _pool = mysql.createPool(config);
  return _pool;
}
