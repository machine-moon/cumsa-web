import { render } from "@testing-library/react";
import BrandLogo from "./BrandLogo";

test("BrandLogo snapshot", () => {
  const { asFragment } = render(<BrandLogo />);
  expect(asFragment()).toMatchSnapshot();
});
