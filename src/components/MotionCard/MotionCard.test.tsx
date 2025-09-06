import { render } from "@testing-library/react";
import MotionCard from "./MotionCard";

// Mock IntersectionObserver for framer-motion
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
global.IntersectionObserver = mockIntersectionObserver;

test("MotionCard snapshot", () => {
  const { asFragment } = render(<MotionCard>Test</MotionCard>);
  expect(asFragment()).toMatchSnapshot();
});
