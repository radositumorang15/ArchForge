import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getSession, ensureDemoUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    let session = await getSession();
    if (!session) {
      session = await ensureDemoUser();
    }

    const { cardId, rating } = await req.json();

    if (!cardId || !rating) {
      return NextResponse.json(
        { error: "cardId dan rating wajib diisi." },
        { status: 400 }
      );
    }

    // Record review log
    await query(
      `INSERT INTO review_logs (card_id, rating, reviewed_at)
       VALUES ($1, $2, NOW())`,
      [cardId, rating]
    );

    // Update card intervals according to FSRS rating
    const daysToAdd = rating === 1 ? 0 : rating === 2 ? 1 : rating === 3 ? 3 : 7;
    await query(
      `UPDATE review_cards
       SET reps = reps + 1,
           last_review = NOW(),
           due = NOW() + ($1 || ' days')::INTERVAL
       WHERE id = $2 AND user_id = $3`,
      [daysToAdd.toString(), cardId, session.profileId]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Review error:", err);
    return NextResponse.json({ error: "Gagal menyimpan review." }, { status: 500 });
  }
}

