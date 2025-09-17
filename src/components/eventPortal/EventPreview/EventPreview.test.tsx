import { render } from "@testing-library/react";
import { EventPreview } from "./EventPreview";

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date("2024-01-01T00:00:00Z"));
});

afterAll(() => {
  jest.useRealTimers();
});

test("EventPreview without image snapshot", () => {
  const event = {
    title: "Test Event",
    date: "2024-01-01",
    location: "Test Location",
  };

  const { asFragment } = render(<EventPreview event={event} />);
  expect(asFragment()).toMatchSnapshot();
});
