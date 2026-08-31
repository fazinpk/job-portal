import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError(401, "Missing access token"));
  }

  try {
    const payload = verifyAccessToken(token);
    req.admin = { id: payload.sub, email: payload.email };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired access token"));
  }
}
