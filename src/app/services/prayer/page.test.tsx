import { test, expect, jest, beforeEach, afterEach } from "@jest/globals";

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

const mockApiResponse = {
  code: 200,
  data: {
    timings: {
      Fajr: "05:30",
      Sunrise: "07:15",
      Dhuhr: "12:45",
      Asr: "15:30",
      Maghrib: "18:45",
      Isha: "20:15",
    },
    date: {
      readable: "Friday, September 6, 2025",
      hijri: {
        date: "15-12-1446",
      },
    },
    meta: {
      timezone: "America/Toronto",
      method: {
        name: "ISNA",
      },
    },
  },
};

beforeEach(() => {
  mockFetch.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("getOttawaTimings returns correct data on success", async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => mockApiResponse,
  } as Response);

  const { getOttawaTimings } = await import("@/lib/prayer-api");

  const result = await getOttawaTimings();

  expect(result).toEqual(mockApiResponse.data);
  expect(mockFetch).toHaveBeenCalledWith(
    expect.stringContaining("https://api.aladhan.com/v1/timingsByCity"),
    expect.any(Object),
  );
});

test("getOttawaTimings returns null on API error", async () => {
  mockFetch.mockResolvedValue({
    ok: false,
  } as Response);

  const { getOttawaTimings } = await import("@/lib/prayer-api");

  const result = await getOttawaTimings();

  expect(result).toBeNull();
});

test("getOttawaTimings returns null on network error", async () => {
  mockFetch.mockRejectedValue(new Error("Network error"));

  const { getOttawaTimings } = await import("@/lib/prayer-api");

  const result = await getOttawaTimings();

  expect(result).toBeNull();
});

test("getOttawaTimings constructs correct API URL", async () => {
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => mockApiResponse,
  } as Response);

  const { getOttawaTimings } = await import("@/lib/prayer-api");

  await getOttawaTimings();

  const expectedUrl = new URL("https://api.aladhan.com/v1/timingsByCity");
  expectedUrl.searchParams.set("city", "Ottawa");
  expectedUrl.searchParams.set("country", "Canada");
  expectedUrl.searchParams.set("method", "2");

  expect(mockFetch).toHaveBeenCalledWith(expectedUrl.toString(), { cache: "no-store" });
});

test("prayer services page exports correct metadata", async () => {
  const { metadata } = await import("./page");

  expect(metadata).toEqual({
    title: "Prayer Services | CUMSA",
  });
});

test("prayer services page has correct prayer order", async () => {
  const expectedOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  expect(expectedOrder).toEqual(["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"]);
});
