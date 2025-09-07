import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import ChaplaincyServicesPage from "./page";

test("chaplaincy services page snapshot", () => {
  const { asFragment } = render(<ChaplaincyServicesPage />);
  expect(asFragment()).toMatchSnapshot();
});
