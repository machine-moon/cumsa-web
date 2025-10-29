import { test, expect } from "@jest/globals";
import { render, act } from "@testing-library/react";
import LocalMosquesClient from "./local-mosques-client";

test("local mosques client snapshot", async () => {
  let component: ReturnType<typeof render> | undefined;

  await act(async () => {
    component = render(<LocalMosquesClient />);
  });

  if (!component) {
    throw new Error("Component failed to render");
  }

  expect(component.asFragment()).toMatchSnapshot();
});
