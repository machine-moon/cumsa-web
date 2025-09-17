import type { NotificationGroup } from "@/types/notifications";

export const DEFAULT_NOTIFICATION_GROUPS: NotificationGroup[] = [
  { key: "events", name: "New posted events", fields: ["title", "date"] },
  { key: "jummah", name: "Jummah prayer updates", fields: ["location", "time"] },
  { key: "announcements", name: "Announcements / PSA / alerts", fields: [] },
];
