import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import type { z } from "zod";
import { useGetCategoriesQuery } from "@/features/categories/categoriesApi";
import {
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetJobByIdQuery,
} from "@/features/jobs/jobsApi";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useToast } from "@/components/ui/toast";
import {
  jobFormSchema,
  EMPTY_JOB_FORM_VALUES,
  type JobFormFieldValues,
} from "./schema";

type JobFormOutput = z.output<typeof jobFormSchema>;

export function useJobFormController() {
  const navigate = useNavigate();
  const { successToast } = useToast();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const jobId = id ? Number(id) : 0;

  const { data: categories = [] } = useGetCategoriesQuery();
  const {
    data: job,
    isLoading: isJobLoading,
    isError: isJobError,
  } = useGetJobByIdQuery(jobId, { skip: !isEditMode });

  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const form = useForm<JobFormFieldValues, unknown, JobFormOutput>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: EMPTY_JOB_FORM_VALUES,
  });

  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        description: job.description,
        location: job.location,
        categoryId: String(job.categoryId),
        experienceLevel: job.experienceLevel,
        employmentType: job.employmentType,
        salaryMin: job.salaryMin != null ? String(job.salaryMin) : "",
        salaryMax: job.salaryMax != null ? String(job.salaryMax) : "",
        status: job.status,
      });
    }
  }, [job, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEditMode) {
        await updateJob({ id: jobId, body: values }).unwrap();
        successToast("Job updated successfully.");
      } else {
        await createJob(values).unwrap();
        successToast("Job created successfully.");
      }
      navigate("/jobs");
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });

  return {
    form,
    onSubmit,
    isEditMode,
    isSubmitting: isCreating || isUpdating,
    isLoadingJob: isEditMode && isJobLoading,
    isJobError: isEditMode && isJobError,
    categories,
  };
}
