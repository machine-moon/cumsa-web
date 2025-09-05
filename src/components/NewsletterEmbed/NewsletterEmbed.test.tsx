import { render } from "@testing-library/react";
import NewsletterEmbed from "./NewsletterEmbed";

test("NewsletterEmbed snapshot", () => {
  const { asFragment } = render(<NewsletterEmbed />);
  expect(asFragment()).toMatchSnapshot();
});
