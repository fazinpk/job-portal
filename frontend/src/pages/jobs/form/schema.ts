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

const requiredCompanyId = z
  .string()
  .transform((value) => Number(value))
  .pipe(z.number().int().positive("Choose a company"));

const optionalNotes = z
  .string()
  .transform((value) => {
    const isEmpty = value.replace(/<[^>]*>/g, "").trim().length === 0;
    return isEmpty ? undefined : value;
  })
  .pipe(z.string().max(5000).optional());

const optionalExperienceYears = z
  .string()
  .transform((value) => (value.trim() === "" ? undefined : value.trim()))
  .pipe(z.string().max(50).optional());

export const jobFormSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    companyId: requiredCompanyId,
    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters"),
    location: z.string().trim().min(2, "Location is required"),
    categoryId: requiredCategoryId,
    experienceLevel: z.enum(experienceLevels),
    experienceYears: optionalExperienceYears,
    employmentType: z.enum(employmentTypes),
    salaryMin: optionalSalary,
    salaryMax: optionalSalary,
    notes: optionalNotes,
    isImmediateJoiner: z.boolean(),
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
  companyId: string;
  description: string;
  location: string;
  categoryId: string;
  experienceLevel: "ENTRY" | "MID" | "SENIOR" | "LEAD";
  experienceYears: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  salaryMin: string;
  salaryMax: string;
  notes: string;
  isImmediateJoiner: boolean;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
}

export const EMPTY_JOB_FORM_VALUES: JobFormFieldValues = {
  title: "",
  companyId: "",
  description: "",
  location: "",
  categoryId: "",
  experienceLevel: "ENTRY",
  experienceYears: "",
  employmentType: "FULL_TIME",
  salaryMin: "",
  salaryMax: "",
  notes: "",
  isImmediateJoiner: false,
  status: "DRAFT",
};
