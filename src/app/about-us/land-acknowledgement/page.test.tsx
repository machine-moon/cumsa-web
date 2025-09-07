import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import LandAcknowledgementPage from "./page";

test("land acknowledgement page snapshot", () => {
  const { asFragment } = render(<LandAcknowledgementPage />);
  expect(asFragment()).toMatchSnapshot();
});
