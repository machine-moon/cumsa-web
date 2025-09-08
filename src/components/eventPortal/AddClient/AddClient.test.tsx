import { render } from "@testing-library/react";
import { AddClient } from "./AddClient";

test("AddClient snapshot", () => {
  const { asFragment } = render(<AddClient />);
  expect(asFragment()).toMatchSnapshot();
});
