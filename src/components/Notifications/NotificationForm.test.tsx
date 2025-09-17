import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NotificationForm from "./NotificationForm";

// Mock fetch
global.fetch = jest.fn();

describe("NotificationForm", () => {
  const mockGroups = [
    { key: "events", name: "Event Notifications", fields: [] },
    { key: "jummah", name: "Jummah Reminders", fields: [] },
    { key: "announcements", name: "General Announcements", fields: [] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  });

  it("renders the form with all elements", () => {
    render(<NotificationForm groups={mockGroups} />);

    expect(screen.getByText("Group")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your announcement...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("populates group dropdown with provided groups", () => {
    render(<NotificationForm groups={mockGroups} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // Should default to first group
    expect(select).toHaveValue("events");

    // Check that all options are present
    expect(screen.getByRole("option", { name: "Event Notifications" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Jummah Reminders" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "General Announcements" })).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    render(<NotificationForm groups={mockGroups} />);

    const groupSelect = screen.getByRole("combobox");
    const messageInput = screen.getByPlaceholderText("Type your announcement...");
    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(groupSelect, { target: { value: "announcements" } });
    fireEvent.change(messageInput, { target: { value: "Test announcement message" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupKey: "announcements",
          payload: { message: "Test announcement message" },
        }),
      });
    });
  });

  it("shows loading state during submission", async () => {
    (fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<NotificationForm groups={mockGroups} />);

    const groupSelect = screen.getByRole("combobox");
    const messageInput = screen.getByPlaceholderText("Type your announcement...");
    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(groupSelect, { target: { value: "events" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText("Sending...")).toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    render(<NotificationForm groups={mockGroups} />);

    const messageInput = screen.getByPlaceholderText("Type your announcement...");
    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(messageInput, { target: { value: "Test message" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Sent")).toBeInTheDocument();
    });
  });

  it("displays error state on failed submission", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    render(<NotificationForm groups={mockGroups} />);

    const messageInput = screen.getByPlaceholderText("Type your announcement...");
    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(messageInput, { target: { value: "Test message" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
  });
});
