"use client";
import { useState, useEffect } from "react";
import { to12Hour } from "@/lib/to12Hour";

type PrayerCountdownProps = {
  timings: Record<string, string> | null;
};

export function PrayerCountdown({ timings }: PrayerCountdownProps) {
  const [countdown, setCountdown] = useState<{
    nextPrayer: string;
    timeRemaining: string;
    prayerTime: string;
  } | null>(null);

  useEffect(() => {
    if (!timings) return;

    function getNextPrayer(now: Date, timings: Record<string, string>) {
      const prayerOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
      const today = new Date(now);
      const prayers = prayerOrder
        .filter((p) => timings[p])
        .map((p) => {
          const [h, m] = timings[p].split(":").map(Number);
          const t = new Date(today);
          t.setHours(h, m, 0, 0);
          return { name: p, time: t, display: timings[p] };
        });
      let next = prayers.find((p) => p.time > now);
      if (!next && timings.Fajr) {
        const t = new Date(today);
        t.setDate(t.getDate() + 1);
        const [h, m] = timings.Fajr.split(":").map(Number);
        t.setHours(h, m, 0, 0);
        next = { name: "Fajr", time: t, display: timings.Fajr };
      }
      return next;
    }

    const updateCountdown = () => {
      if (!timings) return;
      const now = new Date();
      const next = getNextPrayer(now, timings);
      if (!next) return;
      const diff = next.time.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const timeStr = h > 0 ? `${h}h ${m}m ${s}s` : m > 0 ? `${m}m ${s}s` : `${s}s`;
      setCountdown({
        nextPrayer: next.name,
        timeRemaining: timeStr,
        prayerTime: to12Hour(next.display),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  if (!countdown || !timings) {
    return (
      <div className="rounded-lg bg-[var(--red)]/10 px-3 py-2 text-center">
        <span className="text-xs text-[var(--red)]">Loading countdown...</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-[var(--red)]/10 px-3 py-2 text-center w-full max-w-xs ml-auto">
      <div className="text-[var(--red)] text-sm font-semibold leading-tight">
        Next: <span className="font-bold">{countdown.nextPrayer}</span>
      </div>
      <div className="text-base font-mono text-[var(--red)] leading-tight">
        {countdown.timeRemaining} <span className="text-xs font-normal text-gray-600">left</span>
      </div>
      <div className="text-xs text-gray-500 leading-tight">
        Azan: <span className="font-semibold">{countdown.prayerTime}</span>
      </div>
    </div>
  );
}
