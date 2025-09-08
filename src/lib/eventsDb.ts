import Database from "better-sqlite3";
import path from "path";

const dbFile = path.join(process.cwd(), "events.sqlite");
const db = new Database(dbFile);

db.exec(`CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  fee TEXT,
  link TEXT,
  image TEXT,
  imageStyle TEXT DEFAULT 'cover'
)`);

export function getAllEvents() {
  return db.prepare("SELECT * FROM events ORDER BY id DESC").all();
}

export function addEvent(event: Omit<Event, "id">) {
  const stmt = db.prepare(
    "INSERT INTO events (title, date, location, fee, link, image, imageStyle) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );
  const info = stmt.run(
    event.title,
    event.date,
    event.location,
    event.fee,
    event.link,
    event.image,
    event.imageStyle || "cover",
  );
  return { id: info.lastInsertRowid, ...event };
}

export function updateEvent(event: Event) {
  db.prepare(
    "UPDATE events SET title=?, date=?, location=?, fee=?, link=?, image=?, imageStyle=? WHERE id=?",
  ).run(
    event.title,
    event.date,
    event.location,
    event.fee,
    event.link,
    event.image,
    event.imageStyle || "cover",
    event.id,
  );
}

export function deleteEvent(id: number) {
  db.prepare("DELETE FROM events WHERE id=?").run(id);
}

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
