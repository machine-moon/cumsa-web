import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import ZakatNasibPage from "./page";
import { act } from "react";

test("zakat nasib page snapshot", async () => {
  let component: ReturnType<typeof render> | undefined;

  await act(async () => {
    component = render(<ZakatNasibPage />);
  });

  if (!component) {
    throw new Error("Component failed to render");
  }

  expect(component.asFragment()).toMatchSnapshot();
});
