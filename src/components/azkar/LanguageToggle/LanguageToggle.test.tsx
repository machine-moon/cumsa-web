import React from "react";
import { render } from "@testing-library/react";
import { LanguageToggle } from "./index";

describe("LanguageToggle", () => {
  const defaultProps = {
    mode: {
      arabic: true,
      transliteration: true,
      translation: true,
    },
    onChange: jest.fn(),
  };

  it("renders correctly with all options enabled", () => {
    const { container } = render(<LanguageToggle {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with only arabic enabled", () => {
    const { container } = render(
      <LanguageToggle
        {...defaultProps}
        mode={{
          arabic: true,
          transliteration: false,
          translation: false,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with only translation enabled", () => {
    const { container } = render(
      <LanguageToggle
        {...defaultProps}
        mode={{
          arabic: false,
          transliteration: false,
          translation: true,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with arabic and transliteration enabled", () => {
    const { container } = render(
      <LanguageToggle
        {...defaultProps}
        mode={{
          arabic: true,
          transliteration: true,
          translation: false,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
