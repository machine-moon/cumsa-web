import fetch from "./__mocks__/fetch";
import "@testing-library/jest-dom";

// Setup global fetch mock
(global.fetch as jest.Mock) = fetch;

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  notFound: jest.fn(),
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/"),
}));
