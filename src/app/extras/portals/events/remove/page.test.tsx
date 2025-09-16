import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import RemovePage from "./page";

test("remove event page snapshot", () => {
  const { asFragment } = render(<RemovePage />);
  expect(asFragment()).toMatchSnapshot();
});
