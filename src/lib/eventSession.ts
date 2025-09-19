import { SessionOptions } from "iron-session";

// this is because ironauth needs passwords of 32char length and above
const TEMP_DEV_SECRET = "dev-env-secret-password-change-in-production-deployments";

const sessionSecret =
  process.env.EVENT_PORTAL_SESSION_SECRET ||
  (process.env.NODE_ENV === "development" ? TEMP_DEV_SECRET : null);

if (!sessionSecret) {
  throw new Error("EVENT_PORTAL_SESSION_SECRET environment variable is required");
}

if (process.env.NODE_ENV === "development" && sessionSecret === TEMP_DEV_SECRET ) {
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
