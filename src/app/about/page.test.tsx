import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import AboutPage from "./page";

test("about page snapshot", () => {
  const { asFragment } = render(<AboutPage />);
  expect(asFragment()).toMatchSnapshot();
});
