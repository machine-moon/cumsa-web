"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const url = "/sw.js";
    const scope = "/";

    (async () => {
      try {
        // Try to reuse an existing registration first
        let reg = await navigator.serviceWorker.getRegistration(scope);
        if (!reg) {
          reg = await navigator.serviceWorker.register(url, { scope });
          console.info("SW registered", reg.scope);
        }
        // Wait until an active SW is ready controlling the page
        await navigator.serviceWorker.ready;
        console.info("SW ready");
      } catch (err) {
        console.error("SW registration failed", err);
      }
    })();
  }, []);
  return null;
}
