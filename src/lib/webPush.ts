import type * as webPushTypes from "web-push";

let webPush: typeof webPushTypes | null = null;

async function loadWebPush(): Promise<typeof webPushTypes | null> {
  try {
    const webPushModule = await import("web-push");
    return webPushModule.default || webPushModule;
  } catch {
    return null;
  }
}

const webPushPromise = loadWebPush();

const PUBLIC = process.env.VAPID_PUBLIC_KEY || "";
const PRIVATE = process.env.VAPID_PRIVATE_KEY || "";
const SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@cumsa.ca";

export const pushEnabled = !!(PUBLIC && PRIVATE);

// Initialize webPush
webPushPromise
  .then((wp) => {
    webPush = wp;
    if (webPush && PUBLIC && PRIVATE) {
      try {
        webPush.setVapidDetails(SUBJECT, PUBLIC, PRIVATE);
      } catch (e) {
        console.error("VAPID setup failed:", e);
      }
    }
  })
  .catch(() => {
    webPush = null;
  });

if (!PUBLIC || !PRIVATE) {
  console.error(
    "Web Push disabled: missing VAPID keys. Ensure VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY are set.",
  );
}

export { webPush };
