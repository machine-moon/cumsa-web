import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import DocumentsPage from "./page";

test("documents page snapshot", () => {
  const { asFragment } = render(<DocumentsPage />);
  expect(asFragment()).toMatchSnapshot();
});
