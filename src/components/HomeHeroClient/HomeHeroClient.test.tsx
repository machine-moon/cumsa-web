import { render } from "@testing-library/react";
import HomeHeroClient from "./HomeHeroClient";

test("HomeHeroClient snapshot", () => {
  const { asFragment } = render(<HomeHeroClient />);
  expect(asFragment()).toMatchSnapshot();
});
