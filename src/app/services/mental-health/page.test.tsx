import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import MentalHealthPage from "./page";

test("mental health page snapshot", () => {
  const { container } = render(<MentalHealthPage />);
  expect(container).toMatchSnapshot();
});
