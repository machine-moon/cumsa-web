import { GET } from "./route";
import * as azkarApi from "@/lib/azkar/api";
import type { Category } from "@/lib/azkar/types";

jest.mock("@/lib/azkar/api");

describe("GET /api/azkar/categories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns categories successfully", async () => {
    const mockCategories = [
      {
        ID: 1,
        TITLE: "Morning Azkar",
        AUDIO_URL: "https://example.com/audio1.mp3",
        TEXT: "Sample morning azkar text",
      },
      {
        ID: 2,
        TITLE: "Evening Azkar",
        AUDIO_URL: "https://example.com/audio2.mp3",
        TEXT: "Sample evening azkar text",
      },
    ];

    (azkarApi.fetchCategories as jest.Mock).mockResolvedValue(mockCategories);

    const res = await GET();
    const json = await res.json();

    //Step 1: Check status
    expect(res.status).toBe(200);

    //Step 2: Parse JSON and assert shape
    expect(json.ok).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);

    //Step 3: Assert structure of items
    json.data.forEach((item: Category) => {
      expect(item).toHaveProperty("ID");
      expect(item).toHaveProperty("TITLE");
      expect(item).toHaveProperty("AUDIO_URL");
      expect(item).toHaveProperty("TEXT");
      expect(typeof item.ID).toBe("number");
      expect(typeof item.TITLE).toBe("string");
      expect(typeof item.AUDIO_URL).toBe("string");
      expect(typeof item.TEXT).toBe("string");
    });
  });

  test("handles API errors gracefully", async () => {
    (azkarApi.fetchCategories as jest.Mock).mockRejectedValue(new Error("API Error"));

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("API Error");
  });
});
