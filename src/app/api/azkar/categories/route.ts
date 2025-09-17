import { NextResponse } from "next/server";
import { fetchCategories } from "@/lib/azkar/api";

export const revalidate = 900;

export async function GET() {
  try {
    const data = await fetchCategories();
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "error";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
