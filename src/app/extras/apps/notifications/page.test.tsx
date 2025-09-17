import { render, screen } from "@testing-library/react";
import NotificationsApp from "./page";

jest.mock("@/components/Notifications/SubscriptionToggle", () => {
  return function MockSubscriptionToggle({ groupKey, label }: { groupKey: string; label: string }) {
    return <div data-testid={`toggle-${groupKey}`}>{label}</div>;
  };
});

describe("Notifications App Page", () => {
  it("renders the main heading", () => {
    render(<NotificationsApp />);

    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<NotificationsApp />);

    expect(
      screen.getByText("Choose what to hear about. Toggle ON to subscribe."),
    ).toBeInTheDocument();
  });

  it("renders all three notification toggles", () => {
    render(<NotificationsApp />);

    expect(screen.getByTestId("toggle-events")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-jummah")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-announcements")).toBeInTheDocument();
  });

  it("displays correct labels for toggles", () => {
    render(<NotificationsApp />);

    expect(screen.getByText("New posted events (title, date)")).toBeInTheDocument();
    expect(screen.getByText("Jummah prayer updates (location, time)")).toBeInTheDocument();
    expect(screen.getByText("Announcements / PSA / alerts")).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<NotificationsApp />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Notifications");
  });
});
