import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import SubscriptionToggle from "./SubscriptionToggle";

// Mock fetch
global.fetch = jest.fn();

// Mock service worker
Object.defineProperty(navigator, "serviceWorker", {
  value: {
    getRegistration: jest.fn(),
    register: jest.fn(),
    ready: Promise.resolve(),
  },
  writable: true,
});

// Mock Notification API
Object.defineProperty(window, "Notification", {
  value: {
    requestPermission: jest.fn(),
  },
  writable: true,
});

// Mock console.error to suppress in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalConsoleError;
});

describe("SubscriptionToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ events: false }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the toggle with label", async () => {
    await act(async () => {
      render(<SubscriptionToggle groupKey="events" label="Event Notifications" />);
    });

    expect(screen.getByText("Event Notifications")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("loads initial subscription state", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ events: true }),
    });

    await act(async () => {
      render(<SubscriptionToggle groupKey="events" label="Event Notifications" />);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/notifications/subscribe", { cache: "no-store" });
    });
  });

  it("requests permission when toggled on", async () => {
    const mockRegistration = {
      pushManager: {
        getSubscription: jest.fn().mockResolvedValue(null),
        subscribe: jest.fn().mockResolvedValue({
          endpoint: "test-endpoint",
          toJSON: () => ({ keys: { p256dh: "test", auth: "test" } }),
        }),
      },
    };

    (navigator.serviceWorker.getRegistration as jest.Mock).mockResolvedValue(null);
    (navigator.serviceWorker.register as jest.Mock).mockResolvedValue(mockRegistration);
    (window.Notification.requestPermission as jest.Mock).mockResolvedValue("granted");

    await act(async () => {
      render(<SubscriptionToggle groupKey="events" label="Event Notifications" />);
    });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(window.Notification.requestPermission).toHaveBeenCalled();
    });
  });

  it("handles subscription API errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await act(async () => {
      render(<SubscriptionToggle groupKey="events" label="Event Notifications" />);
    });

    // Should not crash and render normally
    expect(screen.getByText("Event Notifications")).toBeInTheDocument();
  });

  it("shows correct visual state when subscribed", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ events: true }),
    });

    await act(async () => {
      render(<SubscriptionToggle groupKey="events" label="Event Notifications" />);
    });

    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });
  });
});
