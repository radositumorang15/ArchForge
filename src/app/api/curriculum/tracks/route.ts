import { NextResponse } from "next/server";
import { getTracksFromDb } from "@/lib/curriculum-service";

export async function GET() {
  try {
    const tracks = await getTracksFromDb();
    return NextResponse.json({ tracks });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

