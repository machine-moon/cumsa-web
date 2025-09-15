import { NextResponse } from "next/server";

const API_BASE = "https://islamicapi.com/api/v1/zakat-nisab/";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const standardRaw = (searchParams.get("standard") || "classical").toLowerCase();
  const currencyRaw = (searchParams.get("currency") || "gbp").toLowerCase();
  const unitRaw = (searchParams.get("unit") || "g").toLowerCase();

  const standard = ["classical", "common"].includes(standardRaw) ? standardRaw : "classical";
  const unit = ["g", "oz"].includes(unitRaw) ? unitRaw : "g";
  const currency = (currencyRaw || "gbp").slice(0, 5);

  const apiKey = process.env.ISLAMICAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { code: 500, status: "error", message: "Missing ISLAMICAPI_KEY" },
      { status: 500 },
    );
  }

  const url = `${API_BASE}?standard=${encodeURIComponent(standard)}&currency=${encodeURIComponent(
    currency,
  )}&unit=${encodeURIComponent(unit)}&api_key=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok || data?.status === "error") {
      return NextResponse.json(
        {
          code: data?.code || res.status,
          status: "error",
          message: data?.message || "Upstream error",
        },
        { status: res.status || 502 },
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { code: 502, status: "error", message: "Unable to fetch zakat nisab values" },
      { status: 502 },
    );
  }
}
