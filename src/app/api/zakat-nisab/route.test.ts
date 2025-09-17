import { GET } from "./route";
import { NextRequest } from "next/server";

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe("GET /api/zakat-nisab", () => {
  it("returns 500 when apiKey is missing", async () => {
    process.env.ISLAMICAPI_KEY = "test-key"; // set it first
    delete process.env.ISLAMICAPI_KEY;
    const req = new NextRequest(`http://localhost/api/zakat-nisab`);
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({
      code: 500,
      status: "error",
      message: "Missing ISLAMICAPI_KEY",
    });
  });

  it("returns 502 when upstream is unreachable", async () => {
    const req = new NextRequest(`http://localhost/api/zakat-nisab`);
    process.env.ISLAMICAPI_KEY = "test-key"; // needed so we don’t hit the 500 check first
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(502);
    expect(json).toEqual({
      code: 502,
      status: "error",
      message: "Unable to fetch zakat nisab values",
    });
  });

  it("returns 200 with valid parameters", async () => {
    process.env.ISLAMICAPI_KEY = "test-key"; // needed so we don’t hit the 500 check first
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        code: 200,
        status: "success",
        message: "Fetched zakat nisab",
        data: { gold: 85, silver: 595 },
      }),
    });

    const req = new NextRequest(`http://localhost/api/zakat-nisab`);
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({
      code: 200,
      status: "success",
      message: "Fetched zakat nisab",
      data: { gold: 85, silver: 595 },
    });
  });
});
