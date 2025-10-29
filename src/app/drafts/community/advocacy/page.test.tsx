import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import AdvocacyPage from "./page";

test("advocacy page snapshot", () => {
  const { asFragment } = render(<AdvocacyPage />);
  expect(asFragment()).toMatchSnapshot();
});
