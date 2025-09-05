import { render } from "@testing-library/react";
import SubscribeSection from "./SubscribeSection";

test("SubscribeSection snapshot", () => {
  const { asFragment } = render(<SubscribeSection />);
  expect(asFragment()).toMatchSnapshot();
});
