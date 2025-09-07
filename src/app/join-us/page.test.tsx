import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import JoinUsPage from "./page";

test("join us page snapshot", () => {
  const { asFragment } = render(<JoinUsPage />);
  expect(asFragment()).toMatchSnapshot();
});
