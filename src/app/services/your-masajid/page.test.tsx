import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import Page from "./page";

test("your masajid page snapshot", async () => {
  const ui = await Page();
  const { asFragment } = render(ui);
  expect(asFragment()).toMatchSnapshot();
});
