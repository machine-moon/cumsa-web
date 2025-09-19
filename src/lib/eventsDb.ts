import Database from "better-sqlite3";
import path from "path";

const dbFile = path.join(process.cwd(), "db.sqlite");
const db = new Database(dbFile);

db.exec(`CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT NOT NULL,
  fee TEXT,
  link TEXT,
  image TEXT,
  imageStyle TEXT DEFAULT 'cover',
  description TEXT
)`);

export function getAllEvents() {
  return db.prepare("SELECT * FROM events ORDER BY id DESC").all();
}

export function addEvent(event: Omit<Event, "id">) {
  const stmt = db.prepare(
    "INSERT INTO events (title, date, time, location, fee, link, image, imageStyle, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );
  const info = stmt.run(
    event.title,
    event.date,
    event.time,
    event.location,
    event.fee,
    event.link,
    event.image,
    event.imageStyle || "cover",
    event.description,
  );
  return { id: info.lastInsertRowid, ...event };
}

export function updateEvent(event: Event) {
  const result = db
    .prepare(
      "UPDATE events SET title=?, date=?, time=?, location=?, fee=?, link=?, image=?, imageStyle=?, description=? WHERE id=?",
    )
    .run(
      event.title,
      event.date,
      event.time || null,
      event.location,
      event.fee || null,
      event.link || null,
      event.image || null,
      event.imageStyle || "cover",
      event.description || null,
      event.id,
    );
  return result;
}

export function deleteEvent(id: number) {
  db.prepare("DELETE FROM events WHERE id=?").run(id);
}

export function countEventsUsingImage(image: string): number {
  const row = db.prepare("SELECT COUNT(*) as count FROM events WHERE image = ?").get(image) as {
    count: number;
  };
  return row?.count ?? 0;
}

export function updateEventsImage(oldImage: string, newImage: string): number {
  const info = db.prepare("UPDATE events SET image = ? WHERE image = ?").run(newImage, oldImage);
  return info.changes || 0;
}

export type Event = {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  fee?: string;
  link?: string;
  image?: string;
  imageStyle?: "cover" | "contain" | "fill" | "scale-down" | "none";
  description?: string;
};
