import { NextResponse } from "next/server";
import { fetchAzkarByCategory } from "@/lib/azkar/api";

export const revalidate = 900;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!Number.isFinite(id))
    return NextResponse.json({ ok: false, error: "invalid id" }, { status: 400 });
  try {
    const data = await fetchAzkarByCategory(id);
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "error";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
