import { GET, POST } from "./route";
import * as notificationsDb from "@/lib/notificationsDb";
import type { NextRequest } from "next/server";

// Mock the entire notificationsDb module to avoid database dependencies
jest.mock("@/lib/notificationsDb", () => ({
  upsertSubscription: jest.fn(),
  updateSubscriptionFlag: jest.fn(),
  getPrefs: jest.fn(),
  ensureDefaultGroups: jest.fn(),
}));

describe("notifications/subscribe API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("returns cookie subscriptions if no endpoint is provided", async () => {
      const req = {
        url: "http://localhost/api/notifications/subscribe",
        cookies: {
          get: jest.fn().mockReturnValue({
            name: "subs",
            value: JSON.stringify({ announcements: true }),
          }),
        },
      } as unknown as NextRequest;

      const res = await GET(req);

      const json = await res.json();
      expect(json).toEqual({ announcements: true });
      expect(req.cookies.get).toHaveBeenCalled();
    });

    it("merges cookie and server prefs when endpoint is provided", async () => {
      const endpoint = "mock-endpoint";
      (notificationsDb.getPrefs as jest.Mock).mockReturnValue({ reminders: true });

      const req = {
        url: `http://localhost/api/notifications/subscribe?endpoint=${endpoint}`,
        cookies: {
          get: jest.fn().mockReturnValue({
            name: "subs",
            value: JSON.stringify({ announcements: true }),
          }),
        },
      } as unknown as NextRequest;

      const res = await GET(req);
      const json = await res.json();

      expect(json).toEqual({ announcements: true, reminders: true });
      expect(notificationsDb.getPrefs).toHaveBeenCalledWith(endpoint);
    });
  });

  describe("POST", () => {
    it("returns 400 if groupKey is missing", async () => {
      const req = {
        json: async () => ({}),
        cookies: { get: jest.fn() },
      } as unknown as NextRequest;

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json).toEqual({ error: "Invalid" });
    });

    it("calls upsertSubscription when endpoint and keys are provided", async () => {
      const req = {
        json: async () => ({
          groupKey: "announcements",
          subscribe: true,
          endpoint: "mock-endpoint",
          keys: { p256dh: "mock-p256dh", auth: "mock-auth" },
        }),
        cookies: {
          get: jest.fn().mockReturnValue({
            name: "subs",
            value: "{}",
          }),
        },
      } as unknown as NextRequest;

      const res = await POST(req);
      const json = await res.json();

      expect(notificationsDb.upsertSubscription).toHaveBeenCalledWith(
        { endpoint: "mock-endpoint", p256dh: "mock-p256dh", auth: "mock-auth" },
        { announcements: true },
      );

      expect(json).toEqual({ announcements: true });
    });

    it("calls updateSubscriptionFlag when endpoint is provided without keys", async () => {
      const req = {
        json: async () => ({
          groupKey: "announcements",
          subscribe: false,
          endpoint: "mock-endpoint",
        }),
        cookies: {
          get: jest.fn().mockReturnValue({
            name: "subs",
            value: "{}",
          }),
        },
      } as unknown as NextRequest;

      const res = await POST(req);
      const json = await res.json();

      expect(notificationsDb.updateSubscriptionFlag).toHaveBeenCalledWith(
        { endpoint: "mock-endpoint", p256dh: "", auth: "" },
        "announcements",
        false,
      );

      expect(json).toEqual({ announcements: false });
    });
  });
});
