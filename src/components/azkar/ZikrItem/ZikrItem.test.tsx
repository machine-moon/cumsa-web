import React from "react";
import { render } from "@testing-library/react";
import { ZikrItem } from "./index";

// Mock the AudioPlayer component
jest.mock("@/components/azkar/AudioPlayer", () => ({
  AudioPlayer: ({ id, isActive, loading }: { id: number; isActive: boolean; loading: boolean }) => (
    <div data-testid="audio-player" data-id={id} data-active={isActive} data-loading={loading}>
      {loading ? "Loading..." : isActive ? "Pause" : "Play"}
    </div>
  ),
}));

describe("ZikrItem", () => {
  const mockZikr = {
    ID: 1,
    ARABIC_TEXT: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    LANGUAGE_ARABIC_TRANSLATED_TEXT: "Subhanallahi wa bihamdihi",
    TRANSLATED_TEXT: "Glory is to Allah and praise is to Him",
    REPEAT: 100,
    AUDIO: "https://example.com/zikr.mp3",
  };

  const defaultProps = {
    zikr: mockZikr,
    display: {
      arabic: true,
      transliteration: true,
      translation: true,
    },
    onPlayAudio: jest.fn(),
    isPlaying: jest.fn(() => false),
    audioLoading: false,
    audioError: null,
  };

  it("renders correctly with all display options", () => {
    const { container } = render(<ZikrItem {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with only Arabic", () => {
    const { container } = render(
      <ZikrItem
        {...defaultProps}
        display={{
          arabic: true,
          transliteration: false,
          translation: false,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with only translation", () => {
    const { container } = render(
      <ZikrItem
        {...defaultProps}
        display={{
          arabic: false,
          transliteration: false,
          translation: true,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly without audio", () => {
    const { container } = render(
      <ZikrItem
        {...defaultProps}
        zikr={{
          ...mockZikr,
          AUDIO: "",
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with single repeat", () => {
    const { container } = render(
      <ZikrItem
        {...defaultProps}
        zikr={{
          ...mockZikr,
          REPEAT: 1,
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with audio playing", () => {
    const { container } = render(
      <ZikrItem {...defaultProps} isPlaying={() => true} audioLoading={true} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with audio error", () => {
    const { container } = render(
      <ZikrItem {...defaultProps} audioError="Failed to load audio" isPlaying={() => true} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
