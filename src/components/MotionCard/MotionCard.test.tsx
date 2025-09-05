import { render } from "@testing-library/react";
import MotionCard from "./MotionCard";

test("MotionCard snapshot", () => {
  const { asFragment } = render(<MotionCard>Test</MotionCard>);
  expect(asFragment()).toMatchSnapshot();
});
