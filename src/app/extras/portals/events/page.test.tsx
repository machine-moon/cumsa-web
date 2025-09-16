import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import EventsPortalEntry from "./page";

test("events portal entry snapshot", () => {
  const { asFragment } = render(<EventsPortalEntry />);
  expect(asFragment()).toMatchSnapshot();
});
