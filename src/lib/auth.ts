import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { query, queryOne } from "./db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "archforge_secret_key_super_secure_2026_neon"
);

export interface UserSessionData {
  userId: string;
  profileId: string;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: UserSessionData): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<UserSessionData | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserSessionData;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<UserSessionData | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("archforge_token")?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function ensureDemoUser(): Promise<UserSessionData> {
  // Check if default demo user exists
  let user = await queryOne<{ id: string; email: string; name: string; role: string }>(
    `SELECT id, email, name, role FROM public.users WHERE email = $1`,
    ["rado@archforge.dev"]
  );

  if (!user) {
    const passwordHash = await hashPassword("password123");
    user = await queryOne<{ id: string; email: string; name: string; role: string }>(
      `INSERT INTO public.users (email, password_hash, name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, role`,
      ["rado@archforge.dev", passwordHash, "Rado", "architect"]
    );
  }

  let profile = await queryOne<{ id: string }>(
    `SELECT id FROM public.profiles WHERE auth_user_id = $1`,
    [user!.id]
  );

  if (!profile) {
    profile = await queryOne<{ id: string }>(
      `INSERT INTO public.profiles (auth_user_id, display_name, locale, bio)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [user!.id, user!.name || "Rado", "id", "Software Architect & Systems Engineer"]
    );

    // Also initialize streak
    await query(
      `INSERT INTO public.streaks (user_id, current, longest, last_day)
       VALUES ($1, 12, 14, CURRENT_DATE)
       ON CONFLICT (user_id) DO NOTHING`,
      [profile!.id]
    );

    // Seed some initial review cards
    await query(
      `INSERT INTO public.review_cards (user_id, source_id, question, answer, track, due, reps, state)
       VALUES
       ($1, 'rust-ownership-01', 'Apa 3 aturan kepemilikan (ownership) di Rust?', '1. Setiap nilai punya pemilik. 2. Hanya ada satu pemilik dalam satu waktu. 3. Ketika pemilik keluar dari scope, nilai didrop.', 'Rust', NOW(), 3, 2),
       ($1, 'sd-caching-01', 'Kapan kita menggunakan Cache-Aside vs Write-Through?', 'Cache-Aside cocok untuk workload read-heavy dengan toleransi data stale sementara; Write-Through menjamin konsistensi tinggi pada write tapi menambah latensi tulis.', 'System Design', NOW(), 5, 2),
       ($1, 'dsa-twopointer-01', 'Kapan Two Pointers lebih unggul daripada Brute Force O(N^2)?', 'Ketika array sudah terurut (sorted) atau kita mencari pasangan / substring dengan kondisi monotonik O(N) waktu dan O(1) memori.', 'DSA', NOW(), 2, 1)
       ON CONFLICT DO NOTHING`,
      [profile!.id]
    );
  }

  return {
    userId: user!.id,
    profileId: profile!.id,
    email: user!.email,
    name: user!.name,
    role: user!.role,
  };
}

export async function getCurrentUserProfile() {
  const session = await getSession();
  if (!session) return null;

  try {
    const row = await queryOne<{
      user_id: string;
      email: string;
      name: string;
      role: string;
      profile_id: string | null;
      display_name: string | null;
      bio: string | null;
      current_streak: number | null;
      longest_streak: number | null;
    }>(
      `SELECT 
        u.id as user_id, 
        u.email, 
        u.name, 
        u.role, 
        p.id as profile_id, 
        p.display_name, 
        p.bio,
        s.current as current_streak,
        s.longest as longest_streak
       FROM public.users u
       LEFT JOIN public.profiles p ON p.auth_user_id = u.id::text
       LEFT JOIN public.streaks s ON s.user_id = p.id
       WHERE u.id::text = $1`,
      [session.userId]
    );

    if (!row) {
      return {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role || "student",
        streak: 1,
      };
    }

    return {
      id: row.user_id,
      email: row.email,
      name: row.display_name || row.name || session.name,
      role: row.role || "student",
      bio: row.bio || "",
      streak: row.current_streak ?? 1,
    };
  } catch (err) {
    console.error("Error fetching current user profile:", err);
    return {
      id: session.userId,
      email: session.email,
      name: session.name,
      role: session.role || "student",
      streak: 1,
    };
  }
}
