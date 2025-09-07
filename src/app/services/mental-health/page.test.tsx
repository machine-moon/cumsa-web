import { test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import MentalHealthPage from "./page";

test("renders key mental health sections", () => {
  render(<MentalHealthPage />);
  const mainHeading = screen.getByRole("heading", { name: /Mental Health & Well‑Being/i });
  const emergency = screen.getByRole("heading", { name: /Immediate Help/i });
  const hotlines = screen.getByRole("heading", { name: /Hotlines/i });
  const revert = screen.getByRole("heading", { name: /Revert Support/i });
  expect(mainHeading.textContent).toMatch(/Mental Health/i);
  expect(emergency).not.toBeNull();
  expect(hotlines).not.toBeNull();
  expect(revert).not.toBeNull();
});

test("matches snapshot", () => {
  const { container } = render(<MentalHealthPage />);
  expect(container).toMatchSnapshot();
});
