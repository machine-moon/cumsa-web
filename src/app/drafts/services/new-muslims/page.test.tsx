import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import NewMuslimsPage from "./page";

test("new muslims page snapshot", () => {
  const { asFragment } = render(<NewMuslimsPage />);
  expect(asFragment()).toMatchSnapshot();
});
