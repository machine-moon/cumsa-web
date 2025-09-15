import { render } from "@testing-library/react";

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => Promise.resolve({})),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("iron-session", () => ({
  getIronSession: jest.fn(() => Promise.resolve({})),
}));
jest.mock("@/lib/eventSession", () => ({
  sessionOptions: {},
}));

import LoginPage from "./page";

test("LoginPage snapshot", async () => {
  const { asFragment } = render(await LoginPage());
  expect(asFragment()).toMatchSnapshot();
});
