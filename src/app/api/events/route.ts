import { NextResponse } from "next/server";
import { getAllEvents, addEvent, updateEvent, deleteEvent } from "@/lib/eventsDb";

export async function GET() {
  return NextResponse.json(getAllEvents());
}

export async function POST(req: Request) {
  const data = await req.json();
  const newEvent = addEvent(data);
  return NextResponse.json(newEvent);
}

export async function PUT(req: Request) {
  const data = await req.json();
  updateEvent(data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  deleteEvent(id);
  return NextResponse.json({ success: true });
}
