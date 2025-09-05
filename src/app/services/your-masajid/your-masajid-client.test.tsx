import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import YourMasajidClient from "./your-masajid-client";

test("your masajid client snapshot", () => {
  const { asFragment } = render(<YourMasajidClient />);
  expect(asFragment()).toMatchSnapshot();
});
