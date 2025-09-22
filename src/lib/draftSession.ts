import { SessionOptions } from "iron-session";

const sessionSecret =
  process.env.DRAFTS_PORTAL_SESSION_SECRET ||
  (process.env.NODE_ENV === "development" ? "dev-secret-change-in-production" : null);

if (!sessionSecret) {
  throw new Error("DRAFTS_PORTAL_SESSION_SECRET environment variable is required");
}

if (process.env.NODE_ENV === "development" && sessionSecret === "dev-secret-change-in-production") {
  console.warn(
    "Using default session secret in development. Set DRAFTS_PORTAL_SESSION_SECRET for production.",
  );
}

export const draftSessionOptions: SessionOptions = {
  password: sessionSecret,
  cookieName: "dra_session",
  cookieOptions: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};
