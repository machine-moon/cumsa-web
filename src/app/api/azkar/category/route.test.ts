import { describe, it, expect } from "@jest/globals";
import { GET } from "./route"; // correct path to your route.ts
import { NextRequest } from "next/server";

// If you need a base URL for constructing a Request
const BASE_URL = "http://localhost";

describe("GET /api/azkar/category", () => {

  it("returns 400 for invalid id", async () => {
    const req = new NextRequest(`${BASE_URL}/api/azkar/category?id=abc`);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("invalid id");
  });

  it("returns data for valid id", async () => {
    // Example: pick an ID that exists in your test dataset
    const validId = 1; 
    const req = new NextRequest(`${BASE_URL}/api/azkar/category?id=${validId}`);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);

    // Optional: check structure of first item
    const first = json.data[0];
    expect(first).toHaveProperty("ID");
    expect(first).toHaveProperty("ARABIC_TEXT");
    expect(first).toHaveProperty("TRANSLATED_TEXT");
    expect(first).toHaveProperty("AUDIO");

  });

});
