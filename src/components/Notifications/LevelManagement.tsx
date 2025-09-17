"use client";

import { useEffect, useState } from "react";
import type { NotificationGroup } from "@/types/notifications";

export default function LevelManagement() {
  const [groups, setGroups] = useState<NotificationGroup[]>([]);
  const [name, setName] = useState("");
  const [fields, setFields] = useState("title,date");

  async function refresh() {
    const res = await fetch("/api/notifications/levels");
    if (res.ok) setGroups(await res.json());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addGroup(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      fields: fields
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/notifications/levels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setName("");
      setFields("");
      refresh();
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addGroup} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group name"
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          value={fields}
          onChange={(e) => setFields(e.target.value)}
          placeholder="Fields (comma separated)"
          className="border rounded-lg px-3 py-2"
        />
        <button className="btn-cozy btn-primary" type="submit">
          Add Group
        </button>
      </form>

      <div className="space-y-2">
        {groups.map((g) => (
          <div key={g.key} className="p-3 border rounded-lg bg-white/80">
            <div className="font-semibold">{g.name}</div>
            <div className="text-sm text-slate-600">Key: {g.key}</div>
            <div className="text-sm">Fields: {g.fields.join(", ") || "message"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
