import { Router } from "express";
import multer from "multer";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { createCompanySchema, updateCompanySchema, companyIdParamSchema } from "./companies.schema.js";
import * as companiesController from "./companies.controller.js";

const ALLOWED_LOGO_TYPES = ["image/png", "image/jpeg", "image/webp"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_LOGO_TYPES.includes(file.mimetype)) {
      return cb(new Error("Logo must be a PNG, JPEG, or WEBP image"));
    }
    cb(null, true);
  },
});

function uploadLogoField(req, res, next) {
  upload.single("logo")(req, res, (err) => {
    if (err) return next(new ApiError(400, err.message));
    next();
  });
}

export const companiesRoutes = Router();

companiesRoutes.get("/", asyncHandler(companiesController.list));

companiesRoutes.post(
  "/",
  authenticate,
  uploadLogoField,
  validate(createCompanySchema),
  asyncHandler(companiesController.create),
);

companiesRoutes.patch(
  "/:id",
  authenticate,
  validate(companyIdParamSchema, "params"),
  uploadLogoField,
  validate(updateCompanySchema),
  asyncHandler(companiesController.update),
);

companiesRoutes.delete(
  "/:id",
  authenticate,
  validate(companyIdParamSchema, "params"),
  asyncHandler(companiesController.remove),
);
