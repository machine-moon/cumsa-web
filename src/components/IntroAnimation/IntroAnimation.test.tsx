import { render, waitFor } from "@testing-library/react";
import IntroAnimation from "./IntroAnimation";

test("IntroAnimation snapshot", async () => {
  const { asFragment } = render(<IntroAnimation />);
  await waitFor(() => {
    expect(asFragment()).toMatchSnapshot();
  });
});
