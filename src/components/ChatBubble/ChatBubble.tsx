"use client";
import { useState } from "react";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {open && (
        <div className="mb-3 w-80 rounded-xl bg-white shadow-xl ring-1 ring-black/10 overflow-hidden relative">
          <button
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-white bg-[var(--blue)] rounded-full w-8 h-8 flex items-center justify-center text-xl hover:bg-[var(--navy)] transition"
            type="button"
          >
            ×
          </button>
          <div className="bg-[var(--blue)] text-white px-4 py-3 font-semibold">Need help?</div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-700">
              Hi! Let us know how we can help and we’ll respond shortly.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("sending");
                const form = e.currentTarget as HTMLFormElement;
                const data = Object.fromEntries(new FormData(form).entries());
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      ...data,
                      from_name: "CUMSA Website Chat",
                      subject: "Chat bubble inquiry",
                    }),
                  });
                  const json = await res.json();
                  setStatus(json.success ? "sent" : "error");
                  if (json.success) form.reset();
                } catch {
                  setStatus("error");
                }
              }}
              className="space-y-2"
            >
              <input
                name="name"
                className="w-full rounded-md border border-black/10 px-3 py-2"
                placeholder="Name"
                required
              />
              <input
                name="email"
                className="w-full rounded-md border border-black/10 px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
              <textarea
                name="message"
                className="w-full rounded-md border border-black/10 px-3 py-2"
                rows={3}
                placeholder="How can we help?"
                required
              />
              <button
                className="btn-cozy btn-primary w-full"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send"}
              </button>
              {status === "error" && (
                <div className="text-xs text-red-700">Failed to send. Check Web3Forms key.</div>
              )}
            </form>
          </div>
        </div>
      )}
      {!open && (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="btn-cozy btn-primary shadow-lg"
        >
          Chat
        </button>
      )}
    </div>
  );
}
