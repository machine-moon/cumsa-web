import { render } from "@testing-library/react";
import ChatBubble from "./ChatBubble";

test("ChatBubble snapshot", () => {
  const { asFragment } = render(<ChatBubble />);
  expect(asFragment()).toMatchSnapshot();
});
