import { render } from "@testing-library/react";
import Input from "./Input";

test("Input snapshot", () => {
  const { asFragment } = render(<Input />);
  expect(asFragment()).toMatchSnapshot();
});
