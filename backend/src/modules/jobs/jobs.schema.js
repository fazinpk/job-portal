import { z } from "zod";

const experienceLevels = ["ENTRY", "MID", "SENIOR", "LEAD"];
const employmentTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];
const jobStatuses = ["DRAFT", "PUBLISHED", "CLOSED"];

export const createJobSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    description: z.string().trim().min(20, "Description must be at least 20 characters"),
    location: z.string().trim().min(2, "Location is required"),
    categoryId: z.coerce.number().int().positive("Choose a category"),
    experienceLevel: z.enum(experienceLevels),
    employmentType: z.enum(employmentTypes),
    salaryMin: z.coerce.number().int().nonnegative().optional(),
    salaryMax: z.coerce.number().int().nonnegative().optional(),
    status: z.enum(jobStatuses).optional().default("DRAFT"),
  })
  .refine((data) => !data.salaryMin || !data.salaryMax || data.salaryMin <= data.salaryMax, {
    message: "Minimum salary cannot exceed maximum salary",
    path: ["salaryMin"],
  });

export const listJobsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(50).optional().default(10),
  categoryId: z.coerce.number().int().positive().optional(),
  experienceLevel: z.enum(experienceLevels).optional(),
  employmentType: z.enum(employmentTypes).optional(),
  status: z.enum(jobStatuses).optional(),
  search: z.string().trim().min(1).optional(),
});
