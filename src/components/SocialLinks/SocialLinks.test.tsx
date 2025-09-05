import { render } from "@testing-library/react";
import SocialLinks from "./SocialLinks";

test("SocialLinks snapshot", () => {
  const { asFragment } = render(<SocialLinks />);
  expect(asFragment()).toMatchSnapshot();
});
