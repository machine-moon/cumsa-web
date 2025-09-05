import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import Home from "./page";

test("home page snapshot", () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});
