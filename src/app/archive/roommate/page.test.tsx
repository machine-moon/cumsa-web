import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import RoommateServicesPage from "./page";

test("roommate services page snapshot", () => {
  const { asFragment } = render(<RoommateServicesPage />);
  expect(asFragment()).toMatchSnapshot();
});
