import * as authService from "./auth.service.js";
import { env } from "../../config/env.js";

const REFRESH_COOKIE = "refreshToken";

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: env.jwt.refreshTtlDays * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  };
}

export async function login(req, res) {
  const { email, password } = req.body;
  const { accessToken, refreshToken, admin } = await authService.login(email, password);

  res.cookie(REFRESH_COOKIE, refreshToken, refreshCookieOptions());
  res.json({ success: true, message: "Logged in", data: { accessToken, admin } });
}

export async function refresh(req, res) {
  const { accessToken, refreshToken, admin } = await authService.refresh(req.cookies[REFRESH_COOKIE]);

  res.cookie(REFRESH_COOKIE, refreshToken, refreshCookieOptions());
  res.json({ success: true, message: "Token refreshed", data: { accessToken, admin } });
}

export async function logout(req, res) {
  await authService.logout(req.cookies[REFRESH_COOKIE]);

  res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });
  res.json({ success: true, message: "Logged out", data: null });
}
