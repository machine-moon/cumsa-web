import { NextResponse } from "next/server";

const CALENDAR_ID = process.env.CALENDAR_ID;
const API_KEY = process.env.API_KEY;
if (!CALENDAR_ID || !API_KEY) {
  console.log("Missing CALENDAR_ID or API_KEY environment variables"); // wasn't printed
  throw new Error("Missing CALENDAR_ID or API_KEY environment variables");
}

export async function GET() {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime`;
  const res = await fetch(url);
  console.log("Fetching events from Google Calendar API:");
  console.log(res);
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: res.status });
  }
  const data = await res.json();
  // You may want to filter/map the events here!
  return NextResponse.json(data.items || []);
}
