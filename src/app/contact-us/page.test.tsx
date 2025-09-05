import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import ContactUsPage from "./page";

test("contact page snapshot", () => {
  const { asFragment } = render(<ContactUsPage />);
  expect(asFragment()).toMatchSnapshot();
});
