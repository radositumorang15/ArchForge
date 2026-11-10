import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { verifyPassword, createSessionToken, ensureDemoUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, isDemo } = body;

    if (isDemo) {
      const demoSession = await ensureDemoUser();
      const token = await createSessionToken(demoSession);

      const res = NextResponse.json({ success: true, user: demoSession });
      res.cookies.set("archforge_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return res;
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await queryOne<{
      id: string;
      email: string;
      password_hash: string;
      name: string;
      role: string;
    }>(`SELECT id, email, password_hash, name, role FROM public.users WHERE email = $1`, [
      email.toLowerCase().trim(),
    ]);

    if (!user) {
      return NextResponse.json(
        { error: "Email atau kata sandi tidak ditemukan." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Email atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    const profile = await queryOne<{ id: string }>(
      `SELECT id FROM public.profiles WHERE auth_user_id = $1`,
      [user.id]
    );

    const sessionPayload = {
      userId: user.id,
      profileId: profile?.id || user.id,
      email: user.email,
      name: user.name || "User",
      role: user.role || "student",
    };

    const token = await createSessionToken(sessionPayload);

    const res = NextResponse.json({ success: true, user: sessionPayload });
    res.cookies.set("archforge_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
