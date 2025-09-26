import { NextResponse } from "next/server";
import { getAllEvents, addEvent, updateEvent, deleteEvent } from "@/lib/eventsDb";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/eventSession";

async function requireAuth(req: Request, res?: Response) {
  // iron-session needs both a req + a response object
  const response = res ?? new NextResponse();
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
  return NextResponse.json(getAllEvents());
}

export async function POST(req: Request) {
  // checking authentication
  const { authorized, response } = await requireAuth(req);
  if (!authorized) return response;

  // adding ann event
  const data = await req.json();
  const newEvent = addEvent(data);
  return NextResponse.json(newEvent);
}

export async function PUT(req: Request) {
  // checking authentication
  const { authorized, response } = await requireAuth(req);
  if (!authorized) return response;

  // editing an event
  const data = await req.json();
  updateEvent(data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  // checking authentication
  const { authorized, response } = await requireAuth(req);
  if (!authorized) return response;

  // deleting an event
  const { id } = await req.json();
  deleteEvent(id);
  return NextResponse.json({ success: true });
}
