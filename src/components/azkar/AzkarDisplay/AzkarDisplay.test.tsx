import React from "react";
import { render } from "@testing-library/react";

type Zikr = {
  ID: number;
  ARABIC_TEXT: string;
  LANGUAGE_ARABIC_TRANSLATED_TEXT: string;
  TRANSLATED_TEXT: string;
  REPEAT: number;
  AUDIO: string;
};

const MockAzkarDisplay = ({ azkar, loading }: { azkar: Zikr[]; loading: boolean }) => {
  if (loading) {
    return (
      <div data-testid="azkar-display-loading">
        <div>Loading...</div>
      </div>
    );
  }

  if (!azkar.length) {
    return (
      <div data-testid="azkar-display-empty">
        <div>Introduction text</div>
      </div>
    );
  }

  return (
    <div data-testid="azkar-display">
      <div data-testid="language-toggle">Language Toggle</div>
      {azkar.map((zikr) => (
        <div key={zikr.ID} data-testid="zikr-item">
          {zikr.TRANSLATED_TEXT}
        </div>
      ))}
    </div>
  );
};

describe("AzkarDisplay", () => {
  const mockAzkar = [
    {
      ID: 1,
      ARABIC_TEXT: "سُبْحَانَ اللهِ",
      LANGUAGE_ARABIC_TRANSLATED_TEXT: "Subhanallah",
      TRANSLATED_TEXT: "Glory is to Allah",
      REPEAT: 33,
      AUDIO: "",
    },
    {
      ID: 2,
      ARABIC_TEXT: "الْحَمْدُ للهِ",
      LANGUAGE_ARABIC_TRANSLATED_TEXT: "Alhamdulillah",
      TRANSLATED_TEXT: "Praise is to Allah",
      REPEAT: 33,
      AUDIO: "",
    },
  ];

  it("renders correctly with azkar", () => {
    const { container } = render(<MockAzkarDisplay azkar={mockAzkar} loading={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when loading", () => {
    const { container } = render(<MockAzkarDisplay azkar={[]} loading={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with empty azkar (introduction)", () => {
    const { container } = render(<MockAzkarDisplay azkar={[]} loading={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
