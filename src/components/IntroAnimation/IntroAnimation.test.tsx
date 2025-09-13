import { render } from "@testing-library/react";
import IntroAnimation from "./IntroAnimation";

test("IntroAnimation snapshot", () => {
  const { asFragment } = render(<IntroAnimation />);
  expect(asFragment()).toMatchSnapshot();
});
