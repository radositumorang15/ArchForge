import { NextResponse } from "next/server";
import { getScenariosFromDb } from "@/lib/curriculum-service";

export async function GET() {
  try {
    const scenarios = await getScenariosFromDb();
    return NextResponse.json({ scenarios });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

