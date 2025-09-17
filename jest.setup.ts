import fetch from "./__mocks__/fetch";

// Setup global fetch mock
(global.fetch as jest.Mock) = fetch;

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  notFound: jest.fn(),
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/"),
}));

// Set required environment variables for testing

process.env.EVENT_PORTAL_SESSION_SECRET =
  process.env.EVENT_PORTAL_SESSION_SECRET || "test-secret-for-testing-only";
