import { test, expect } from "@jest/globals";
import { render, act } from "@testing-library/react";
import YourMasajidClient from "./your-masajid-client";

test("your masajid client snapshot", async () => {
  let component: ReturnType<typeof render> | undefined;

  await act(async () => {
    component = render(<YourMasajidClient />);
  });

  if (!component) {
    throw new Error("Component failed to render");
  }

  expect(component.asFragment()).toMatchSnapshot();
});
