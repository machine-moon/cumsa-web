import { describe, it, expect } from "@jest/globals";
import { GET } from "./route"; // correct path to your route.ts
import { NextRequest } from "next/server";

// If you need a base URL for constructing a Request
const BASE_URL = "http://localhost";

describe("GET /api/azkar/category", () => {
  beforeAll(() => {
    jest.mock("@/lib/azkar/api", () => ({
      ...jest.requireActual("@/lib/azkar/api"),
      fetchAzkarByCategory: jest.fn().mockResolvedValue([
        {
          ID: 1,
          ARABIC_TEXT: "الحمد لله الذي أحيا...",
          LANGUAGE_ARABIC_TRANSLATED_TEXT: "Alhamdu lillahil-lathee...",
          TRANSLATED_TEXT: "All praise is for Allah...",
          REPEAT: 1,
          AUDIO: "http://www.hisnmuslim.com/audio/ar/1.mp3",
        },
      ]),
    }));
  });
  it("returns 400 for invalid id", async () => {
    const req = new NextRequest(`${BASE_URL}/api/azkar/category?id=abc`);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("invalid id");
  });
});
