"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface QuranQuote {
  quranQuote: string;
  reference: string;
}

export default function IntroAnimation({ isExiting = false }: { isExiting?: boolean }) {
  const [quote, setQuote] = useState<QuranQuote | null>(null);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const introShown = typeof window !== "undefined" && localStorage.getItem("introShown");
    if (introShown) {
      setShow(false);
      return;
    }

    let retryTimer: NodeJS.Timeout | null = null;
    let progressTimer: NodeJS.Timeout | null = null;

    const loadQuote = async () => {
      try {
        const res = await fetch("/api/quran-quote", { cache: "no-store" });
        if (!res.ok) throw new Error("edge miss");
        const q: QuranQuote = await res.json();
        setQuote(q);
        if (retryTimer) clearInterval(retryTimer);
      } catch {
        // try again later
      }
    };

    loadQuote();
    retryTimer = setInterval(loadQuote, 5000);

    progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setShow(false);
          localStorage.setItem("introShown", "true");
          return 100;
        }
        return p + 2;
      });
    }, 44);

    return () => {
      if (retryTimer) clearInterval(retryTimer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-800 ease-in-out ${isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}
      style={{ background: "#fff" }}
    >
      {/* CUMSA Logo */}
      <Image
        src="/CU-MSA-LOGO.png"
        alt="CUMSA Logo"
        width={100}
        height={100}
        className="mb-8 animate-bounce"
        style={{ filter: "drop-shadow(0 0 16px var(--blue))" }}
        priority
      />

      {/* Quranic Quote */}
      <div className="w-full max-w-lg mb-8">
        <div className="bg-[var(--blue)]/10 rounded-xl p-6 border border-[var(--blue)]/30 shadow-lg">
          {quote ? (
            <div className="text-center">
              <p
                className="text-xl font-light leading-relaxed mb-2 text-[var(--blue)]"
                style={{ fontFamily: "serif", fontWeight: 400 }}
              >
                {quote.quranQuote}
              </p>
              <p className="text-sm font-medium text-[var(--blue)] opacity-80">
                — {quote.reference}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-[var(--blue)]/20 rounded mb-2" />
                <div className="h-4 bg-[var(--blue)]/20 rounded mb-2" />
                <div className="h-3 bg-[var(--blue)]/20 rounded w-1/2 mx-auto" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Bar */}
      <div className="w-full max-w-lg mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[var(--blue)] text-sm font-medium">Loading...</span>
          <span className="text-[var(--blue)] text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-[var(--blue)]/20 rounded-full h-4">
          <div
            className="bg-[var(--blue)] h-4 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
