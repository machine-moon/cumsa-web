"use client";
import { useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
      subject: formData.get("subject")?.toString().trim() || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
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
        name="message"
        required
      />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send"}
        </Button>
        {status === "error" && <span className="text-sm text-red-700">Failed to send.</span>}
        {status === "sent" && (
          <span className="text-sm text-green-700">Thanks! We’ll get back to you soon.</span>
        )}
      </div>
    </form>
  );
}
