import Database from "better-sqlite3";
import path from "path";
import type { NotificationGroup, SubscriptionMap } from "@/types/notifications";
import { DEFAULT_NOTIFICATION_GROUPS } from "@/utils/notifications";

const dbFile = path.join(process.cwd(), "db.sqlite");
const db = new Database(dbFile);

db.exec(`CREATE TABLE IF NOT EXISTS notification_groups (
  key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  fields TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS push_subscriptions (
  endpoint TEXT PRIMARY KEY,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
)`);

db.exec(`CREATE TABLE IF NOT EXISTS subscription_preferences (
  endpoint TEXT NOT NULL,
  group_key TEXT NOT NULL,
  subscribed INTEGER DEFAULT 1,
  PRIMARY KEY (endpoint, group_key),
  FOREIGN KEY (endpoint) REFERENCES push_subscriptions(endpoint) ON DELETE CASCADE,
  FOREIGN KEY (group_key) REFERENCES notification_groups(key) ON DELETE CASCADE
)`);

function rowToGroup(row: { key: string; name: string; fields: string }): NotificationGroup {
  let fields: string[] = [];
  try {
    fields = JSON.parse(row.fields);
    if (!Array.isArray(fields)) fields = [];
  } catch {
    fields = [];
  }
  return { key: row.key, name: row.name, fields };
}

export function ensureDefaultGroups() {
  const existing = db.prepare("SELECT key FROM notification_groups").all() as { key: string }[];
  const existingSet = new Set(existing.map((r) => r.key));
  const insert = db.prepare(
    "INSERT OR IGNORE INTO notification_groups (key, name, fields) VALUES (?, ?, ?)",
  );
  for (const g of DEFAULT_NOTIFICATION_GROUPS) {
    if (!existingSet.has(g.key as string)) {
      insert.run(String(g.key), g.name, JSON.stringify(g.fields || []));
    }
  }
}

export function getAllGroups(): NotificationGroup[] {
  const rows = db
    .prepare("SELECT key, name, fields FROM notification_groups ORDER BY key")
    .all() as {
    key: string;
    name: string;
    fields: string;
  }[];
  return rows.map(rowToGroup);
}

export function addGroup(name: string, fields: string[]): NotificationGroup {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const stmt = db.prepare(
    "INSERT INTO notification_groups (key, name, fields) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET name=excluded.name, fields=excluded.fields",
  );
  stmt.run(key, name, JSON.stringify(fields || []));
  return { key, name, fields };
}

export function updateGroup(
  key: string,
  name?: string,
  fields?: string[],
): NotificationGroup | null {
  const row = db
    .prepare("SELECT key, name, fields FROM notification_groups WHERE key = ?")
    .get(key) as { key: string; name: string; fields: string } | undefined;
  if (!row) return null;
  const nextName = name ? String(name) : row.name;
  const nextFields = fields ? JSON.stringify(fields) : row.fields;
  db.prepare("UPDATE notification_groups SET name = ?, fields = ? WHERE key = ?").run(
    nextName,
    nextFields,
    key,
  );
  return rowToGroup({ key, name: nextName, fields: String(nextFields) });
}

export type PushSubscriptionRecord = {
  endpoint: string;
  p256dh: string;
  auth: string;
};

export function upsertSubscription(
  sub: PushSubscriptionRecord,
  prefs: SubscriptionMap,
): { endpoint: string } {
  // Insert or update the subscription
  const stmt = db.prepare(
    `INSERT INTO push_subscriptions (endpoint, p256dh, auth)
     VALUES (?, ?, ?)
     ON CONFLICT(endpoint) DO UPDATE SET
       p256dh=excluded.p256dh,
       auth=excluded.auth`,
  );
  stmt.run(sub.endpoint, sub.p256dh, sub.auth);

  // Clear existing preferences for this endpoint
  db.prepare("DELETE FROM subscription_preferences WHERE endpoint = ?").run(sub.endpoint);

  // Insert new preferences
  const prefStmt = db.prepare(
    "INSERT INTO subscription_preferences (endpoint, group_key, subscribed) VALUES (?, ?, ?)",
  );
  for (const [groupKey, subscribed] of Object.entries(prefs)) {
    if (subscribed) {
      prefStmt.run(sub.endpoint, groupKey, 1);
    }
  }

  return { endpoint: sub.endpoint };
}

export function updateSubscriptionFlag(
  sub: PushSubscriptionRecord,
  groupKey: string,
  subscribe: boolean,
): void {
  // Ensure subscription exists
  db.prepare(
    `INSERT INTO push_subscriptions (endpoint, p256dh, auth)
     VALUES (?, ?, ?)
     ON CONFLICT(endpoint) DO UPDATE SET
       p256dh=excluded.p256dh,
       auth=excluded.auth`,
  ).run(sub.endpoint, sub.p256dh, sub.auth);

  if (subscribe) {
    db.prepare(
      `INSERT INTO subscription_preferences (endpoint, group_key, subscribed)
       VALUES (?, ?, 1)
       ON CONFLICT(endpoint, group_key) DO UPDATE SET subscribed = 1`,
    ).run(sub.endpoint, groupKey);
  } else {
    db.prepare("DELETE FROM subscription_preferences WHERE endpoint = ? AND group_key = ?").run(
      sub.endpoint,
      groupKey,
    );
  }
}

export function deleteSubscription(endpoint: string): void {
  db.prepare("DELETE FROM subscription_preferences WHERE endpoint = ?").run(endpoint);
  db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(endpoint);
}

export function listSubscriptionsByGroup(groupKey: string): PushSubscriptionRecord[] {
  const rows = db
    .prepare(
      `
      SELECT DISTINCT ps.endpoint, ps.p256dh, ps.auth
      FROM push_subscriptions ps
      JOIN subscription_preferences sp ON ps.endpoint = sp.endpoint
      WHERE sp.group_key = ? AND sp.subscribed = 1
    `,
    )
    .all(groupKey) as PushSubscriptionRecord[];
  return rows;
}

export function getPrefs(endpoint: string): SubscriptionMap {
  const rows = db
    .prepare("SELECT group_key FROM subscription_preferences WHERE endpoint = ? AND subscribed = 1")
    .all(endpoint) as { group_key: string }[];

  const prefs: SubscriptionMap = {};
  for (const row of rows) {
    prefs[row.group_key] = true;
  }
  return prefs;
}

// Ensure defaults on module load
ensureDefaultGroups();
