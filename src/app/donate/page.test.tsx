import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import DonatePage from "./page";

test("donate page snapshot", () => {
  const { asFragment } = render(<DonatePage />);
  expect(asFragment()).toMatchSnapshot();
});
