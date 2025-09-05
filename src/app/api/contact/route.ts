import { NextResponse } from "next/server";
import { WEB3FORMS_ENDPOINT } from "@/lib/constants";
export const dynamic = "force-dynamic";

function badRequest(msg: string) {
  return NextResponse.json({ success: false, error: msg }, { status: 400 });
}

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  from_name?: string;
};

function extractFields(payload: ContactPayload) {
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();
  const subject = String(payload.subject || "Message from website").trim();
  const from_name = String(payload.from_name || "CUMSA Website").trim();
  return { name, email, message, subject, from_name };
}

export async function POST(request: Request) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) return badRequest("Server is missing WEB3FORMS_KEY");

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return badRequest("Only application/json supported");
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const { name, email, message, subject, from_name } = extractFields(payload);
  if (!name || !email || !message) return badRequest("Missing required fields");

  const form = new FormData();
  form.append("access_key", key);
  form.append("from_name", from_name);
  form.append("subject", subject);
  form.append("name", name);
  form.append("email", email);
  form.append("message", message);

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: form });
    const json = await res.json();
    if (!res.ok || !json.success) {
      return NextResponse.json(
        { success: false, error: json?.message || "Send failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Upstream error" }, { status: 502 });
  }
}
