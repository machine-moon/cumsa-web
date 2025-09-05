import { render } from "@testing-library/react";
import MasajidMapClient from "./MasajidMapClient";

test("MasajidMapClient snapshot", () => {
  const { asFragment } = render(<MasajidMapClient mosques={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
