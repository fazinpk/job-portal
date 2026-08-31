import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err, req, res, next) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  if (statusCode === 500) console.error(err);

  res.status(statusCode).json({ success: false, message });
}
