import React from "react";
import { render } from "@testing-library/react";
import { AudioPlayer } from "./index";

describe("AudioPlayer", () => {
  const defaultProps = {
    id: "test-audio",
    audioUrl: "https://example.com/audio.mp3",
    onPlay: jest.fn(),
    isActive: false,
    loading: false,
  };

  it("renders correctly when inactive", () => {
    const { container } = render(<AudioPlayer {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when active", () => {
    const { container } = render(<AudioPlayer {...defaultProps} isActive={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when loading", () => {
    const { container } = render(<AudioPlayer {...defaultProps} isActive={true} loading={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with label", () => {
    const { container } = render(<AudioPlayer {...defaultProps} label="Audio Label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with error", () => {
    const { container } = render(
      <AudioPlayer {...defaultProps} isActive={true} error="Audio failed to load" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
