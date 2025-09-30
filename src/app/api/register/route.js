import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req) {
  const { username, email, phone, password, confirm } = await req.json();

  const pool = getPool();

  const [existRows] = await pool.execute(
    "SELECT id FROM users WHERE email = ?",
    [email.trim().toLowerCase()]
  );
  if (existRows.length) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const [result] = await pool.execute(
    "INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)",
    [username.trim(), email.trim().toLowerCase(), phone.replace(/\D/g, ""), hashed]
  );

  return NextResponse.json({ ok: true, userId: result.insertId }, { status: 201 });
}
