import { NextResponse } from "next/server";
import { getProjectsFromDb } from "@/lib/curriculum-service";

export async function GET() {
  try {
    const projects = await getProjectsFromDb();
    return NextResponse.json({ projects });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

