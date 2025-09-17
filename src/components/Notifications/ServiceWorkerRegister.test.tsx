import { render, waitFor } from "@testing-library/react";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

const mockNavigator = {
  serviceWorker: {
    register: jest.fn(),
    ready: Promise.resolve({
      showNotification: jest.fn(),
    }),
  },
};

const originalNavigator = global.navigator;

describe("ServiceWorkerRegister", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, "navigator", {
      value: mockNavigator,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      writable: true,
    });
  });

  it("registers service worker when supported", async () => {
    const mockRegister = jest.fn().mockResolvedValue({});
    mockNavigator.serviceWorker.register = mockRegister;

    render(<ServiceWorkerRegister />);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("/sw.js");
    });
  });

  it("handles service worker registration failure", async () => {
    const mockRegister = jest.fn().mockRejectedValue(new Error("Registration failed"));
    mockNavigator.serviceWorker.register = mockRegister;

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(<ServiceWorkerRegister />);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("/sw.js");
    });

    consoleSpy.mockRestore();
  });

  it("handles unsupported service worker", () => {
    Object.defineProperty(global, "navigator", {
      value: {},
      writable: true,
    });

    expect(() => render(<ServiceWorkerRegister />)).not.toThrow();
  });
});
