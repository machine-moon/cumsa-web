// Global mock for eventsDb
export const mockEvents = [
  {
    id: 1,
    title: "Test Event 1",
    date: "2024-12-01",
    location: "Test Location 1",
    fee: "Free",
    link: "https://example.com/1",
    image: "/test1.jpg",
    imageStyle: "cover" as const,
  },
  {
    id: 2,
    title: "Test Event 2",
    date: "2024-12-02",
    location: "Test Location 2",
    fee: "$10",
    link: "https://example.com/2",
    image: "/test2.jpg",
    imageStyle: "contain" as const,
  },
];

export const getAllEvents = jest.fn(() => mockEvents);
export const addEvent = jest.fn();
export const updateEvent = jest.fn();
export const deleteEvent = jest.fn();
export const getEvent = jest.fn((id: number) => mockEvents.find((e) => e.id === id));

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  fee?: string;
  link?: string;
  image?: string;
  imageStyle?: "cover" | "contain" | "fill" | "scale-down" | "none";
};
