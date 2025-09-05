import { render } from "@testing-library/react";
import Hero from "./Hero";

test("Hero snapshot", () => {
  const { asFragment } = render(<Hero title="Test Title" subtitle="Test Subtitle" />);
  expect(asFragment()).toMatchSnapshot();
});
