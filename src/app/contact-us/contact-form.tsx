"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
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
    <form className="space-y-6 animate-fade-in" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-slide-in-left">
          <Input
            name="name"
            placeholder="Your name"
            required
            className="rounded-lg border-2 border-gray-200 focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="animate-slide-in-right">
          <Input
            name="email"
            type="email"
            placeholder="Your email"
            required
            className="rounded-lg border-2 border-gray-200 focus:border-blue-400 transition-colors"
          />
        </div>
      </div>

      <div className="animate-slide-in-left">
        <Input
          name="subject"
          placeholder="Subject"
          className="rounded-lg border-2 border-gray-200 focus:border-blue-400 transition-colors"
        />
      </div>

      <div className="animate-slide-in-right">
        <textarea
          className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          rows={6}
          placeholder="Tell us what’s on your mind..."
          name="message"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="btn-cozy btn-primary flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          {status === "sending" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : status === "sent" ? (
            <>
              <FaPaperPlane className="text-green-200" />
              Sent!
            </>
          ) : (
            <>
              <FaPaperPlane />
              Send Message
            </>
          )}
        </Button>

        <div
          className={`text-sm transition-opacity duration-300 ${status === "error" || status === "sent" ? "opacity-100" : "opacity-0"}`}
        >
          {status === "error" && (
            <span className="text-red-600 flex items-center gap-2">
              <span>❌</span>
              Failed to send. Please try again.
            </span>
          )}
          {status === "sent" && (
            <span className="text-green-600 flex items-center gap-2">
              <span>✅</span>
              Thanks! We&apos;ll get back to you soon.
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
