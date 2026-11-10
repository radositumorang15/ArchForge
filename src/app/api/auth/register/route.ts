import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { hashPassword, createSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    const existing = await queryOne(
      `SELECT id FROM public.users WHERE email = $1`,
      [email.toLowerCase().trim()]
    );

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await queryOne<{ id: string; email: string; name: string; role: string }>(
      `INSERT INTO public.users (name, email, password_hash, role)
       VALUES ($1, $2, $3, 'student')
       RETURNING id, email, name, role`,
      [name.trim(), email.toLowerCase().trim(), passwordHash]
    );

    const newProfile = await queryOne<{ id: string }>(
      `INSERT INTO public.profiles (auth_user_id, display_name, locale)
       VALUES ($1, $2, 'id')
       RETURNING id`,
      [newUser!.id, name.trim()]
    );

    // Initialize streak for new user
    await query(
      `INSERT INTO public.streaks (user_id, current, longest, last_day)
       VALUES ($1, 1, 1, CURRENT_DATE)`,
      [newProfile!.id]
    );

    const sessionPayload = {
      userId: newUser!.id,
      profileId: newProfile!.id,
      email: newUser!.email,
      name: newUser!.name,
      role: newUser!.role,
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
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Gagal mendaftar akun baru." },
      { status: 500 }
    );
  }
}
