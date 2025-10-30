import { render } from "@testing-library/react";
import BackButton from ".";

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

test("BackButton snapshot", () => {
  const { asFragment } = render(<BackButton href="/test" />);
  expect(asFragment()).toMatchSnapshot();
});

test("BackButton with custom label snapshot", () => {
  const { asFragment } = render(<BackButton href="/test" label="Go Back" />);
  expect(asFragment()).toMatchSnapshot();
});
