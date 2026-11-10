import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

// GET: Fetch user's previous interview sessions
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile id
    const profile = await queryOne<{ id: string }>(
      `SELECT id FROM public.profiles WHERE auth_user_id = $1`,
      [session.userId]
    );

    if (!profile) {
      return NextResponse.json({ sessions: [] });
    }

    const rows = await query(
      `SELECT 
        id, 
        user_id, 
        kind, 
        title, 
        started_at, 
        ended_at, 
        current_phase, 
        phases, 
        transcript, 
        outcome 
       FROM public.interview_sessions 
       WHERE user_id::text = $1 
       ORDER BY started_at DESC 
       LIMIT 20`,
      [profile.id]
    );

    return NextResponse.json({ sessions: rows });
  } catch (err: any) {
    console.error("GET interview sessions error:", err);
    return NextResponse.json(
      { error: "Gagal memuat riwayat wawancara." },
      { status: 500 }
    );
  }
}

// POST: Save or complete an interview session
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      kind = "system_design",
      title,
      startedAt,
      endedAt,
      currentPhase,
      phases,
      transcript,
      outcome,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Judul sesi wawancara wajib disertakan." },
        { status: 400 }
      );
    }

    // Ensure profile exists for this user
    let profile = await queryOne<{ id: string }>(
      `SELECT id FROM public.profiles WHERE auth_user_id = $1`,
      [session.userId]
    );

    if (!profile) {
      profile = await queryOne<{ id: string }>(
        `INSERT INTO public.profiles (auth_user_id, display_name, locale)
         VALUES ($1, $2, 'id')
         RETURNING id`,
        [session.userId, session.name || "Student"]
      );
    }

    const inserted = await queryOne(
      `INSERT INTO public.interview_sessions (
        user_id, 
        kind, 
        title, 
        started_at, 
        ended_at, 
        current_phase, 
        phases, 
        transcript, 
        outcome
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        profile!.id,
        kind,
        title,
        startedAt ? new Date(startedAt) : new Date(),
        endedAt ? new Date(endedAt) : new Date(),
        currentPhase || "completed",
        JSON.stringify(phases || {}),
        JSON.stringify(transcript || []),
        JSON.stringify(outcome || {}),
      ]
    );

    return NextResponse.json({ success: true, session: inserted });
  } catch (err: any) {
    console.error("POST interview session error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan sesi wawancara." },
      { status: 500 }
    );
  }
}

