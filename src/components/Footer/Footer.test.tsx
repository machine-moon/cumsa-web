import { render } from "@testing-library/react";
import Footer from "./Footer";

test("Footer snapshot", () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
