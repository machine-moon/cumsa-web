import { NextResponse } from "next/server";
import { getAllEvents, addEvent, updateEvent, deleteEvent } from "@/lib/eventsDb";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";

async function requireAuth(req: Request) {
  const response = new NextResponse();
  const session = await getIronSession<{ authorized?: boolean }>(req, response, sessionOptions);
  if (!session.authorized) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { authorized: true, response };
}

export async function GET() {
  try {
    const events = await getAllEvents();
    if (!events || !Array.isArray(events)) throw new Error("Events not found or invalid format");
    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /api/events error:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { authorized, response } = await requireAuth(req);
  if (!authorized) return response;
  let data;
  try {
    data = await req.json();
  } catch (err) {
    console.error("POST /api/events invalid JSON:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    if (!data || typeof data !== "object") throw new Error("Missing or invalid event data");
    const newEvent = await addEvent(data);
    return NextResponse.json(newEvent);
  } catch (err) {
    console.error("POST /api/events error:", err);
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { authorized, response } = await requireAuth(req);
  if (!authorized) return response;
  let data;
  try {
    data = await req.json();
  } catch (err) {
    console.error("PUT /api/events invalid JSON:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    if (!data || typeof data !== "object") throw new Error("Missing or invalid event data");
    await updateEvent(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/events error:", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { authorized, response } = await requireAuth(req);
  if (!authorized) return response;
  let data;
  try {
    data = await req.json();
  } catch (err) {
    console.error("DELETE /api/events invalid JSON:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    if (!data || typeof data !== "object" || !data.id)
      throw new Error("Missing or invalid event id");
    await deleteEvent(data.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/events error:", err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
