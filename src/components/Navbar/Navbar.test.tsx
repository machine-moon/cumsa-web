import { render } from "@testing-library/react";
import Navbar from "./Navbar";

test("Navbar snapshot", () => {
  const { asFragment } = render(<Navbar />);
  expect(asFragment()).toMatchSnapshot();
});
