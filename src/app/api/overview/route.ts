import { NextResponse } from "next/server";
import { overview } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    ...overview,
    generatedAt: new Date().toISOString(),
  });
}
