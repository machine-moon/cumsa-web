import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import JoinUs from "./page";

test("join us page snapshot", () => {
  const { asFragment } = render(<JoinUs />);
  expect(asFragment()).toMatchSnapshot();
});
