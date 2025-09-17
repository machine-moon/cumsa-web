import { render } from "@testing-library/react";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

Object.defineProperty(navigator, "serviceWorker", {
  value: {
    getRegistration: jest.fn(),
    register: jest.fn(),
    ready: Promise.resolve(),
  },
  writable: true,
});

const originalConsole = {
  info: console.info,
  error: console.error,
};

describe("ServiceWorkerRegister", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.info = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.info = originalConsole.info;
    console.error = originalConsole.error;
  });

  it("renders without crashing", () => {
    render(<ServiceWorkerRegister />);
  });

  it("registers service worker when not already registered", async () => {
    const mockRegistration = { scope: "/test-scope" };
    (navigator.serviceWorker.getRegistration as jest.Mock).mockResolvedValue(null);
    (navigator.serviceWorker.register as jest.Mock).mockResolvedValue(mockRegistration);

    render(<ServiceWorkerRegister />);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(navigator.serviceWorker.register).toHaveBeenCalledWith("/sw.js", { scope: "/" });
    expect(console.info).toHaveBeenCalledWith("SW registered", "/test-scope");
  });

  it("reuses existing service worker registration", async () => {
    const mockRegistration = { scope: "/existing-scope" };
    (navigator.serviceWorker.getRegistration as jest.Mock).mockResolvedValue(mockRegistration);

    render(<ServiceWorkerRegister />);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    expect(console.info).toHaveBeenCalledWith("SW ready");
  });

  it("handles registration errors gracefully", async () => {
    const error = new Error("Registration failed");
    (navigator.serviceWorker.getRegistration as jest.Mock).mockResolvedValue(null);
    (navigator.serviceWorker.register as jest.Mock).mockRejectedValue(error);

    render(<ServiceWorkerRegister />);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(console.error).toHaveBeenCalledWith("SW registration failed", error);
  });
});
