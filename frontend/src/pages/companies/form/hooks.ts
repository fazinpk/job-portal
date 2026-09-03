import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "@/features/companies/companiesApi";
import { useToast } from "@/components/ui/toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  companyFormSchema,
  EMPTY_COMPANY_FORM_VALUES,
  type CompanyFormFieldValues,
} from "./schema";

export function useCompanyFormController() {
  const navigate = useNavigate();
  const { successToast } = useToast();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const companyId = id ? Number(id) : 0;

  const { data: companies, isLoading: isCompaniesLoading } = useGetCompaniesQuery();
  const company = companies?.find((c) => c.id === companyId);

  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoObjectUrl, setLogoObjectUrl] = useState<string | null>(null);
  const logoPreview = logoObjectUrl ?? company?.logoUrl ?? null;

  const form = useForm<CompanyFormFieldValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: EMPTY_COMPANY_FORM_VALUES,
  });

  useEffect(() => {
    if (isEditMode && company) {
      form.reset({ name: company.name });
    }
  }, [company, isEditMode, form]);

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file);
    setLogoObjectUrl(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      if (logoFile) formData.append("logo", logoFile);

      if (isEditMode) {
        await updateCompany({ id: companyId, body: formData }).unwrap();
        successToast("Company updated successfully.");
      } else {
        await createCompany(formData).unwrap();
        successToast("Company created successfully.");
      }
      navigate("/companies");
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });

  return {
    form,
    onSubmit,
    isEditMode,
    isSubmitting: isCreating || isUpdating,
    isLoadingCompany: isEditMode && isCompaniesLoading,
    logoPreview,
    hasPendingLogoFile: Boolean(logoFile),
    handleLogoChange,
  };
}
