import { GET, POST, PUT, DELETE } from "./route";
import type { IronSession } from "iron-session";
import { getIronSession } from "iron-session";

// mock eventsDb so its functions become jest mock functions
jest.mock("@/lib/eventsDb", () => ({
  addEvent: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn(),
  getAllEvents: jest.fn(),
}));

// import after mocking so you get the mocked versions
import { addEvent, updateEvent, deleteEvent, getAllEvents } from "@/lib/eventsDb";

(addEvent as jest.Mock).mockReturnValue({
  id: "1",
  title: "Test Event",
  date: "2025-10-01",
  location: "Online",
});

(getAllEvents as jest.Mock).mockReturnValue([
  { id: "1", title: "Test Event", date: "2025-10-01", location: "Online" },
]);

(updateEvent as jest.Mock).mockReturnValue({
  id: "1",
  title: "Test Event Updated",
  date: "2025-10-02",
  location: "Carleton",
});

(deleteEvent as jest.Mock).mockReturnValue(true);

jest.mock("iron-session");
beforeAll(() => {
  process.env.EVENT_PORTAL_SESSION_SECRET = "test-secret"; // any string
});

afterAll(() => {
  delete process.env.EVENT_PORTAL_SESSION_SECRET; // clean up
});
describe("POST src/app/api/events/route.ts", () => {
  const mockGetIronSession = getIronSession as jest.MockedFunction<typeof getIronSession>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds events successfull when authorized", async () => {
    mockGetIronSession.mockResolvedValue({ authorized: true } as unknown as IronSession<{
      authorized?: boolean;
    }>);
    const eventData = {
      title: "Test Event",
      date: "2025-10-01",
      time: "18:00",
      location: "Online",
      fee: "Free",
      link: "https://example.com",
      image: "test.png",
      description: "This is a test event",
    };
    const req = new Request("http://localhost/api/events", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "applications/json" },
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toHaveProperty("id");
    expect(json).toHaveProperty("title");
    expect(json).toHaveProperty("date");
    expect(json).toHaveProperty("location");
    expect(addEvent).toHaveBeenCalledWith(eventData);
  });
  it("does not add events when not authorized", async () => {
    mockGetIronSession.mockResolvedValue({ authorized: false } as unknown as IronSession<{
      authorized?: boolean;
    }>);
    const eventData = {
      title: "Test Event",
      date: "2025-10-01",
      time: "18:00",
      location: "Online",
      fee: "Free",
      link: "https://example.com",
      image: "test.png",
      description: "This is a test event",
    };
    const req = new Request("http://localhost/api/events", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "applications/json" },
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json).toEqual({ error: "Unauthorized" });
  });
});

describe("GET src/app/api/events/route.ts", () => {
  it("gets all events", async () => {
    const res = await GET();
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(getAllEvents).toHaveBeenCalled();
  });
});

describe("PUT src/app/api/events/route.ts", () => {
  const mockGetIronSession = getIronSession as jest.MockedFunction<typeof getIronSession>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates events successfully when authorized", async () => {
    mockGetIronSession.mockResolvedValue({ authorized: true } as unknown as IronSession<{
      authorized?: boolean;
    }>);
    const eventData = {
      id: 1,
      title: "Test Event Updated",
      date: "2025-10-02",
      time: "19:00",
      location: "Carleton",
      fee: "Free",
      link: "https://example.com",
      image: "test.png",
      description: "This is a test event",
    };
    const req = new Request("http://localhost/api/events", {
      method: "PUT",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "applications/json" },
    });
    const res = await PUT(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toMatchObject({ success: true });
    expect(updateEvent).toHaveBeenCalledWith(eventData);
  });

  it("does not update events when not authorized", async () => {
    mockGetIronSession.mockResolvedValue({ authorized: false } as unknown as IronSession<{
      authorized?: boolean;
    }>);
    const eventData = {
      id: 1,
      title: "Test Event Updated",
      date: "2025-10-02",
      time: "19:00",
      location: "Carleton",
      fee: "Free",
      link: "https://example.com",
      image: "test.png",
      description: "This is a test event",
    };
    const req = new Request("http://localhost/api/events", {
      method: "PUT",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "applications/json" },
    });
    const res = await PUT(req);
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json).toMatchObject({ error: "Unauthorized" });
  });
});

describe("DELETE src/app/api/events/route.ts", () => {
  const mockGetIronSession = getIronSession as jest.MockedFunction<typeof getIronSession>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deletes events successfully when authorized", async () => {
    mockGetIronSession.mockResolvedValue({ authorized: true } as unknown as IronSession<{
      authorized?: boolean;
    }>);
    const eventData = {
      id: 1,
      title: "Test Event Updated",
      date: "2025-10-02",
      time: "19:00",
      location: "Carleton",
      fee: "Free",
      link: "https://example.com",
      image: "test.png",
      description: "This is a test event",
    };
    const req = new Request("http://localhost/api/events", {
      method: "DELETE",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "applications/json" },
    });
    const res = await DELETE(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toMatchObject({ success: true });
    expect(deleteEvent).toHaveBeenCalledWith(eventData.id);
  });

  it("does not delete events when not authorized", async () => {
    mockGetIronSession.mockResolvedValue({ authorized: false } as unknown as IronSession<{
      authorized?: boolean;
    }>);
    const eventData = {
      id: 1,
      title: "Test Event Updated",
      date: "2025-10-02",
      time: "19:00",
      location: "Carleton",
      fee: "Free",
      link: "https://example.com",
      image: "test.png",
      description: "This is a test event",
    };
    const req = new Request("http://localhost/api/events", {
      method: "DELETE",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "applications/json" },
    });
    const res = await DELETE(req);
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json).toMatchObject({ error: "Unauthorized" });
  });
});
