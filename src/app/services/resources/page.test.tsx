import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import ResourcesPage from "./page";

test("resources page snapshot", () => {
  const { asFragment } = render(<ResourcesPage />);
  expect(asFragment()).toMatchSnapshot();
});
