import { Link } from "react-router-dom";
import { TextField } from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoadingView } from "@/components/views/loading";
import { ErrorView } from "@/components/views/error";
import {
  EXPERIENCE_LEVEL_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  JOB_STATUS_OPTIONS,
} from "@/features/jobs/job.constants";
import { useJobFormController } from "./hooks";

export function JobFormPage() {
  const {
    form,
    onSubmit,
    isEditMode,
    isSubmitting,
    isLoadingJob,
    isJobError,
    categories,
  } = useJobFormController();
  const {
    register,
    formState: { errors },
  } = form;

  if (isLoadingJob) {
    return <LoadingView message="Loading job..." />;
  }

  if (isJobError) {
    return <ErrorView message="Failed to load this job." />;
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {errors.root && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.root.message}
          </p>
        )}

        <TextField
          label="Title"
          placeholder="e.g. Senior Backend Engineer"
          required
          error={errors.title?.message}
          {...register("title")}
        />
        <Textarea
          label="Description"
          placeholder="Describe the role, responsibilities, and requirements"
          required
          error={errors.description?.message}
          {...register("description")}
        />
        <TextField
          label="Location"
          placeholder="e.g. Bengaluru, India / Remote"
          required
          error={errors.location?.message}
          {...register("location")}
        />

        <Select
          label="Category"
          placeholder="Choose a category"
          required
          error={errors.categoryId?.message}
          options={categories.map((category) => ({
            label: category.name,
            value: String(category.id),
          }))}
          {...register("categoryId")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Experience level"
            required
            error={errors.experienceLevel?.message}
            options={EXPERIENCE_LEVEL_OPTIONS}
            {...register("experienceLevel")}
          />
          <Select
            label="Employment type"
            required
            error={errors.employmentType?.message}
            options={EMPLOYMENT_TYPE_OPTIONS}
            {...register("employmentType")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Minimum salary"
            type="number"
            placeholder="e.g. 15000"
            error={errors.salaryMin?.message}
            {...register("salaryMin")}
          />
          <TextField
            label="Maximum salary"
            type="number"
            placeholder="e.g. 25000"
            error={errors.salaryMax?.message}
            {...register("salaryMax")}
          />
        </div>

        <Select
          label="Status"
          required
          options={JOB_STATUS_OPTIONS}
          {...register("status")}
        />

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" theme="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Create Job"}
          </Button>
          <Link to="/jobs">
            <Button type="button" theme="secondary">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
