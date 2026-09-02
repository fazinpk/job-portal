import { z } from "zod";

const experienceLevels = ["ENTRY", "MID", "SENIOR", "LEAD"] as const;
const employmentTypes = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
] as const;
const jobStatuses = ["DRAFT", "PUBLISHED", "CLOSED"] as const;

const optionalSalary = z
  .string()
  .transform((value) => (value === "" ? undefined : Number(value)))
  .pipe(z.number().int().nonnegative().optional());

const requiredCategoryId = z
  .string()
  .transform((value) => Number(value))
  .pipe(z.number().int().positive("Choose a category"));

export const jobFormSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters"),
    location: z.string().trim().min(2, "Location is required"),
    categoryId: requiredCategoryId,
    experienceLevel: z.enum(experienceLevels),
    employmentType: z.enum(employmentTypes),
    salaryMin: optionalSalary,
    salaryMax: optionalSalary,
    status: z.enum(jobStatuses),
  })
  .refine(
    (data) =>
      !data.salaryMin || !data.salaryMax || data.salaryMin <= data.salaryMax,
    {
      message: "Minimum salary cannot exceed maximum salary",
      path: ["salaryMin"],
    },
  );

export interface JobFormFieldValues {
  title: string;
  description: string;
  location: string;
  categoryId: string;
  experienceLevel: "ENTRY" | "MID" | "SENIOR" | "LEAD";
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  salaryMin: string;
  salaryMax: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
}

export const EMPTY_JOB_FORM_VALUES: JobFormFieldValues = {
  title: "",
  description: "",
  location: "",
  categoryId: "",
  experienceLevel: "ENTRY",
  employmentType: "FULL_TIME",
  salaryMin: "",
  salaryMax: "",
  status: "DRAFT",
};
