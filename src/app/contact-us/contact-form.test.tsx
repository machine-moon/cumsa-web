import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import ContactForm from "./contact-form";

test("contact form snapshot", () => {
  const { asFragment } = render(<ContactForm />);
  expect(asFragment()).toMatchSnapshot();
});
