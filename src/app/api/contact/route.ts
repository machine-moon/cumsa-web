import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  return NextResponse.json({ message: "Message received: " + body }, { status: 200 });
}
