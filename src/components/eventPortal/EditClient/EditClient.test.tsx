import { render } from "@testing-library/react";
import { EditClient } from "./EditClient";

test("EditClient snapshot", () => {
  const mockEvents = [
    { id: 1, title: "Test Event", date: "2024-01-01", location: "Test Location" },
  ];
  const { asFragment } = render(<EditClient events={mockEvents} />);
  expect(asFragment()).toMatchSnapshot();
});
