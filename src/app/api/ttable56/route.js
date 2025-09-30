// /pages/api/me.js หรือ /app/api/me/route.js สำหรับ app router
import { getUserFromSession } from "../../lib/auth"; // สมมุติคุณมีฟังก์ชันดึง user จาก session

export default async function handler(req, res) {
  const user = await getUserFromSession(req); // ใช้ cookie, JWT, session แล้วแต่ระบบคุณ
  if (!user) return res.status(401).json({ error: "Not authenticated" });

  res.status(200).json({ user });
}
