import { test, expect } from "@jest/globals";
import { render, act } from "@testing-library/react";
import EventsPage from "./page";

// Mock fetch to avoid network calls in tests
const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]), // Return empty array for events
  } as Response),
);

global.fetch = mockFetch;

test("events page snapshot", async () => {
  let result: ReturnType<typeof render>;

  await act(async () => {
    result = render(<EventsPage />);
    // Wait for useEffect to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  expect(result!.asFragment()).toMatchSnapshot();
});
