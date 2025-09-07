import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import GalleryPage from "./page";

test("gallery page snapshot", () => {
  const { asFragment } = render(<GalleryPage />);
  expect(asFragment()).toMatchSnapshot();
});
