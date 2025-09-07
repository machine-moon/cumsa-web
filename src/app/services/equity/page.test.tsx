import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import EquityServicesPage from "./page";

test("equity services page snapshot", () => {
  const { asFragment } = render(<EquityServicesPage />);
  expect(asFragment()).toMatchSnapshot();
});
