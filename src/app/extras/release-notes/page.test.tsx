import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import ReleaseNotesPage from "./page";

test("release notes page snapshot", () => {
  const { asFragment } = render(<ReleaseNotesPage />);
  expect(asFragment()).toMatchSnapshot();
});
