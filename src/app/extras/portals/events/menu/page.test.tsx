import { render } from "@testing-library/react";
import EventsMenu from "./page";

test("EventsMenu snapshot", () => {
  const { asFragment } = render(<EventsMenu />);
  expect(asFragment()).toMatchSnapshot();
});
