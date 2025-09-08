import { render } from "@testing-library/react";
import LoginPage from "./page";

test("LoginPage snapshot", () => {
  const { asFragment } = render(<LoginPage />);
  expect(asFragment()).toMatchSnapshot();
});
