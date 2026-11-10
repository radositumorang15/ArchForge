import { NextResponse } from "next/server";
import { getSession, ensureDemoUser } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    // If no active session, provide demo user info for immediate interactive preview
    const demo = await ensureDemoUser();
    return NextResponse.json({ authenticated: false, user: demo });
  }
  return NextResponse.json({ authenticated: true, user: session });
}

