import React from "react";
import { render } from "@testing-library/react";
import { CategoryList } from "./index";

// Mock the AudioPlayer component
jest.mock("@/components/azkar/AudioPlayer", () => ({
  AudioPlayer: ({ id, isActive, loading }: { id: number; isActive: boolean; loading: boolean }) => (
    <div data-testid="audio-player" data-id={id} data-active={isActive} data-loading={loading}>
      {loading ? "Loading..." : isActive ? "Pause" : "Play"}
    </div>
  ),
}));

describe("CategoryList", () => {
  const mockCategories = [
    { ID: 1, TITLE: "Morning Azkar", AUDIO_URL: "", TEXT: "https://example.com/morning.json" },
    {
      ID: 2,
      TITLE: "Evening Azkar",
      AUDIO_URL: "https://example.com/evening.mp3",
      TEXT: "https://example.com/evening.json",
    },
    { ID: 3, TITLE: "Sleep Azkar", AUDIO_URL: "", TEXT: "https://example.com/sleep.json" },
  ];

  const defaultProps = {
    categories: mockCategories,
    onSelect: jest.fn(),
    onPlayAudio: jest.fn(),
    isPlaying: jest.fn(() => false),
    audioLoading: false,
    audioError: null,
  };

  it("renders correctly with categories", () => {
    const { container } = render(<CategoryList {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with active category", () => {
    const { container } = render(<CategoryList {...defaultProps} activeId={1} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with audio loading", () => {
    const { container } = render(
      <CategoryList {...defaultProps} audioLoading={true} isPlaying={() => true} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with audio error", () => {
    const { container } = render(
      <CategoryList {...defaultProps} audioError="Failed to load audio" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with invalid categories", () => {
    const { container } = render(<CategoryList {...defaultProps} categories={null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with empty categories", () => {
    const { container } = render(<CategoryList {...defaultProps} categories={[]} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
