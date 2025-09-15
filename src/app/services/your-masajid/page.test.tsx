import { test, expect } from "@jest/globals";
import { render, act } from "@testing-library/react";
import Page from "./page";

test("your masajid page snapshot", async () => {
  const resolvedPage = await Page();
  let component: ReturnType<typeof render> | undefined;

  await act(async () => {
    component = render(resolvedPage);
  });

  if (!component) {
    throw new Error("Component failed to render");
  }

  expect(component.asFragment()).toMatchSnapshot();
});
