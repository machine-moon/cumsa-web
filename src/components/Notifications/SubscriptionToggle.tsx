"use client";

import { useEffect, useState, useId } from "react";
import type { SubscriptionMap } from "@/types/notifications";

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function decodeBase64Url(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  const raw = atob(padded);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

type Props = {
  groupKey: string;
  label: string;
};

export default function SubscriptionToggle({ groupKey, label }: Props) {
  const [subs, setSubs] = useState<SubscriptionMap>({});
  const subscribed = !!subs[groupKey];
  const [loading, setLoading] = useState(false);
  const id = useId();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/notifications/subscribe", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as SubscriptionMap;
        if (!cancelled) setSubs(data || {});
      } catch (e) {
        console.error("Failed to load subscription map", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function getOrRegisterSW() {
    if (!("serviceWorker" in navigator)) return undefined;
    // Ensure there is a controller
    let reg = await navigator.serviceWorker.getRegistration("/");
    if (!reg) {
      try {
        reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch (e) {
        console.error("SW register from toggle failed", e);
        return undefined;
      }
    }
    try {
      await navigator.serviceWorker.ready;
    } catch {}
    return reg ?? undefined;
  }

  async function handleChange(next: boolean) {
    if (loading) return;
    setLoading(true);
    try {
      let endpoint: string | undefined;
      let keys: { p256dh: string; auth: string } | undefined;

      if (next) {
        try {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            console.warn("Notification permission not granted:", permission);
          } else {
            const reg = await getOrRegisterSW();
            if (reg) {
              const existing = await reg.pushManager.getSubscription();
              const appKey = VAPID_KEY
                ? (decodeBase64Url(
                    VAPID_KEY,
                  ) as unknown as PushSubscriptionOptionsInit["applicationServerKey"])
                : undefined;
              const subscribeOptions: PushSubscriptionOptionsInit = appKey
                ? { userVisibleOnly: true, applicationServerKey: appKey }
                : { userVisibleOnly: true };
              const sub = existing || (await reg.pushManager.subscribe(subscribeOptions));
              const json = sub?.toJSON() as { keys?: { p256dh: string; auth: string } };
              endpoint = sub?.endpoint;
              keys = json?.keys;
            } else {
              console.warn(
                "Service worker registration failed, cannot subscribe to push notifications",
              );
            }
          }
        } catch (e) {
          console.error("Push subscribe failed", e);
        }
      }

      const res = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupKey, subscribe: next, endpoint, keys }),
      });
      if (res.ok) {
        const data = (await res.json()) as SubscriptionMap;
        setSubs(data);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <label
      htmlFor={`${id}-${groupKey}`}
      className="flex items-center justify-between p-4 border rounded-xl bg-white/80 backdrop-blur-sm cursor-pointer select-none"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-block w-2.5 h-2.5 rounded-full"
          style={{ background: subscribed ? "var(--blue)" : "#cbd5e1" }}
        />
        <span className="font-medium">{label}</span>
      </div>
      <div className="relative inline-flex items-center">
        <input
          id={`${id}-${groupKey}`}
          type="checkbox"
          checked={subscribed}
          onChange={(e) => handleChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className="h-7 w-12 rounded-full transition-colors"
          style={{ background: subscribed ? "var(--blue)" : "#e2e8f0" }}
        />
        <div
          className="absolute h-5 w-5 rounded-full bg-white transition-transform"
          style={{ transform: subscribed ? "translateX(20px)" : "translateX(2px)" }}
        />
      </div>
    </label>
  );
}
