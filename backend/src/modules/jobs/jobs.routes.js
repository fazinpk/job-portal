import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createJobSchema, updateJobSchema, listJobsQuerySchema, jobIdParamSchema } from "./jobs.schema.js";
import * as jobsController from "./jobs.controller.js";

export const jobsRoutes = Router();

jobsRoutes.get("/", validate(listJobsQuerySchema, "query"), asyncHandler(jobsController.list));
jobsRoutes.get("/:id", validate(jobIdParamSchema, "params"), asyncHandler(jobsController.getById));
jobsRoutes.post("/", authenticate, validate(createJobSchema), asyncHandler(jobsController.create));

jobsRoutes.patch(
  "/:id",
  authenticate,
  validate(jobIdParamSchema, "params"),
  validate(updateJobSchema),
  asyncHandler(jobsController.update),
);

jobsRoutes.delete(
  "/:id",
  authenticate,
  validate(jobIdParamSchema, "params"),
  asyncHandler(jobsController.remove),
);
