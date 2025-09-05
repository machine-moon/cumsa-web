import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import LinksPage from "./page";

test("links page snapshot", async () => {
  const ui = await LinksPage();
  const { asFragment } = render(ui);
  expect(asFragment()).toMatchSnapshot();
});
