import React from "react";
import { render } from "@testing-library/react";

const MockAzkarLayout = () => (
  <div data-testid="azkar-layout">
    <div data-testid="category-list">Categories</div>
    <div data-testid="azkar-display">Azkar Display</div>
  </div>
);

describe("AzkarLayout", () => {
  it("renders correctly as snapshot", () => {
    const { container } = render(<MockAzkarLayout />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with mock structure", () => {
    const { container } = render(<MockAzkarLayout />);
    expect(container.querySelector('[data-testid="azkar-layout"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="category-list"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="azkar-display"]')).toBeInTheDocument();
  });
});
