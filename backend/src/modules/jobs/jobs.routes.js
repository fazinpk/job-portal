import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createJobSchema, listJobsQuerySchema } from "./jobs.schema.js";
import * as jobsController from "./jobs.controller.js";

export const jobsRoutes = Router();

jobsRoutes.get("/", validate(listJobsQuerySchema, "query"), asyncHandler(jobsController.list));
jobsRoutes.post("/", authenticate, validate(createJobSchema), asyncHandler(jobsController.create));
