import { render } from "@testing-library/react";
import Button from "./Button";

test("Button snapshot", () => {
  const { asFragment } = render(<Button />);
  expect(asFragment()).toMatchSnapshot();
});
