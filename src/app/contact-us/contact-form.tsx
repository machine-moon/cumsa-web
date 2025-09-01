"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", "903900d6-718c-41f7-ad85-da101b30763e"); // LOL
    data.append("from_name", "CUMSA Website");
    data.append("subject", data.get("subject")?.toString() || "New message from CUMSA website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="mt-3 space-y-3" onSubmit={onSubmit}>
      <Input name="name" placeholder="Your name" required />
      <Input name="email" type="email" placeholder="Your email" required />
      <Input name="subject" placeholder="Subject" />
      <textarea
        className="w-full rounded-md border border-black/10 bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        rows={5}
        placeholder="Message"
      />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send"}
        </Button>
        {status === "error" && (
          <span className="text-sm text-red-700">Failed to send. Check Web3Forms key.</span>
        )}
        {status === "sent" && (
          <span className="text-sm text-green-700">Thanks! We’ll get back to you soon.</span>
        )}
      </div>
    </form>
  );
}
