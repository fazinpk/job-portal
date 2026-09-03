import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { loginRateLimiter } from "../../middlewares/loginRateLimiter.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { loginSchema } from "./auth.schema.js";
import * as authController from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/login", loginRateLimiter, validate(loginSchema), asyncHandler(authController.login));
authRoutes.post("/refresh", asyncHandler(authController.refresh));
authRoutes.post("/logout", asyncHandler(authController.logout));
