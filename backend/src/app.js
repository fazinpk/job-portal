import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "./config/env.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { categoriesRoutes } from "./modules/categories/categories.routes.js";
import { jobsRoutes } from "./modules/jobs/jobs.routes.js";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";

export const app = express();

app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is up", data: { time: new Date().toISOString() } });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((req, res, next) => next(new ApiError(404, "Not found")));
app.use(errorHandler);
