import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getSession, ensureDemoUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    let session = await getSession();
    if (!session) {
      session = await ensureDemoUser();
    }

    const { lessonId, status, notes } = await req.json();

    if (!lessonId || !status) {
      return NextResponse.json(
        { error: "lessonId dan status wajib diisi." },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO lesson_progress (user_id, lesson_id, status, notes, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, lesson_id)
       DO UPDATE SET status = EXCLUDED.status, notes = COALESCE(EXCLUDED.notes, lesson_progress.notes), updated_at = NOW()`,
      [session.profileId, lessonId, status, notes || null]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Progress error:", err);
    return NextResponse.json({ error: "Gagal menyimpan progres." }, { status: 500 });
  }
}

