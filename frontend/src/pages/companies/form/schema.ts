import { z } from "zod";

export const companyFormSchema = z.object({
  name: z.string().trim().min(1, "Company name is required"),
});

export interface CompanyFormFieldValues {
  name: string;
}

export const EMPTY_COMPANY_FORM_VALUES: CompanyFormFieldValues = {
  name: "",
};
