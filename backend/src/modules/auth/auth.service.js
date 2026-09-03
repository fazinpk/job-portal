import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError.js";
import { signAccessToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

function refreshExpiry() {
  return new Date(Date.now() + env.jwt.refreshTtlDays * 24 * 60 * 60 * 1000);
}

export async function login(email, password) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = signAccessToken(admin);
  const refreshToken = generateRefreshToken();

  await prisma.refreshToken.create({
    data: {
      tokenHash: hashToken(refreshToken),
      adminId: admin.id,
      expiresAt: refreshExpiry(),
    },
  });

  return {
    accessToken,
    refreshToken,
    admin: { id: admin.id, name: admin.name, email: admin.email },
  };
}

const ROTATION_GRACE_MS = 5000;

export async function refresh(oldToken) {
  if (!oldToken) throw new ApiError(401, "Missing refresh token");

  const record = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(oldToken) },
  });
  if (!record || record.expiresAt < new Date()) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const revokedJustNow =
    record.revokedAt &&
    Date.now() - record.revokedAt.getTime() < ROTATION_GRACE_MS;
  if (record.revokedAt && !revokedJustNow) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const admin = await prisma.admin.findUnique({
    where: { id: record.adminId },
  });
  if (!admin) throw new ApiError(401, "Invalid refresh token");

  const newRefreshToken = generateRefreshToken();

  await prisma.$transaction([
    prisma.refreshToken.updateMany({
      where: { tokenHash: hashToken(oldToken), revokedAt: null },
      data: { revokedAt: new Date() },
    }),
    prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(newRefreshToken),
        adminId: admin.id,
        expiresAt: refreshExpiry(),
      },
    }),
  ]);

  return {
    accessToken: signAccessToken(admin),
    refreshToken: newRefreshToken,
    admin: { id: admin.id, name: admin.name, email: admin.email },
  };
}

export async function logout(token) {
  if (!token) return;
  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashToken(token), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
