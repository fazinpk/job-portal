import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as categoriesController from "./categories.controller.js";

export const categoriesRoutes = Router();

categoriesRoutes.get("/", asyncHandler(categoriesController.list));
