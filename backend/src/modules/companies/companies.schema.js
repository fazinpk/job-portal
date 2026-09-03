import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().trim().min(1, "Company name is required"),
});

export const updateCompanySchema = createCompanySchema.partial();

export const companyIdParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid company id"),
});
