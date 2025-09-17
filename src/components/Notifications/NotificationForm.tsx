"use client";

import { useState } from "react";

type Props = {
  groups: { key: string; name: string; fields: string[] }[];
};

export default function NotificationForm({ groups }: Props) {
  const [groupKey, setGroupKey] = useState<string>(groups[0]?.key || "announcements");
  const current = groups.find((g) => g.key === groupKey);
  const [form, setForm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  function updateField(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupKey, payload: form }),
      });
      if (res.ok) setStatus("Sent");
      else setStatus("Failed");
    } catch {
      setStatus("Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Group</label>
        <select
          value={groupKey}
          onChange={(e) => setGroupKey(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          {groups.map((g) => (
            <option key={g.key} value={g.key}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {current?.fields?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {current.fields.map((f) => (
            <div key={f}>
              <label className="block text-sm font-medium mb-1 capitalize">{f}</label>
              <input
                value={form[f] || ""}
                onChange={(e) => updateField(f, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder={f}
                required
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Type your announcement..."
            rows={4}
            required
            value={form.message || ""}
            onChange={(e) => updateField("message", e.target.value)}
          />
        </div>
      )}

      <button type="submit" className="btn-cozy btn-primary" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
      {status && <span className="ml-3 text-sm">{status}</span>}
    </form>
  );
}
