import { SessionOptions } from "iron-session";

const sessionSecret =
  process.env.EVENT_PORTAL_SESSION_SECRET ||
  (process.env.NODE_ENV === "development" ? "dev-secret-change-in-production" : null);

if (!sessionSecret) {
  throw new Error("EVENT_PORTAL_SESSION_SECRET environment variable is required");
}

if (process.env.NODE_ENV === "development" && sessionSecret === "dev-secret-change-in-production") {
  console.warn(
    "Using default session secret in development. Set EVENT_PORTAL_SESSION_SECRET for production.",
  );
}

export const sessionOptions: SessionOptions = {
  password: sessionSecret,
  cookieName: "evt_session",
  cookieOptions: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};
