import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccessToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessTtl,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}
