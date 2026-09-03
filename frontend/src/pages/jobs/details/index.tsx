import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingView } from "@/components/views/loading";
import { ErrorView } from "@/components/views/error";
import { JOB_STATUS_THEME } from "@/features/jobs/job.constants";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { useJobDetailsController } from "./hooks";

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="mt-1 text-sm text-slate-600">{value}</p>
    </div>
  );
}

export function JobDetailsPage() {
  const {
    job,
    isLoading,
    isError,
    isDeleteConfirmOpen,
    isDeleting,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = useJobDetailsController();

  if (isLoading) {
    return <LoadingView message="Loading job..." />;
  }

  if (isError || !job) {
    return <ErrorView message="Failed to load this job." />;
  }

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;
  const salaryRange =
    job.salaryMin != null || job.salaryMax != null
      ? `${job.salaryMin != null ? formatCurrency(job.salaryMin) : "—"} - ${
          job.salaryMax != null ? formatCurrency(job.salaryMax) : "—"
        }`
      : "Not specified";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{job.title}</h1>
          <div className="mt-1 flex items-center gap-2">
            <CompanyAvatar name={job.company.name} logoUrl={job.company.logoUrl} size={36} />
            <p className="text-sm text-slate-600">{job.company.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/jobs/${job.id}/edit`}>
            <Button theme="secondary">
              <Pencil size={16} />
              Edit
            </Button>
          </Link>
          <Button theme="danger" onClick={requestDelete}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge theme={JOB_STATUS_THEME[job.status]}>{job.status}</Badge>
        <span className="text-sm text-slate-500">{job.category.name}</span>
        {job.isImmediateJoiner && (
          <Badge theme="success">Immediate joiner</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DetailField label="Location" value={job.location} />
        <DetailField label="Experience level" value={job.experienceLevel} />
        {job.experienceYears && (
          <DetailField label="Years of experience" value={job.experienceYears} />
        )}
        <DetailField label="Employment type" value={job.employmentType} />
        <DetailField label="Salary range (per month)" value={salaryRange} />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700">Description</p>
        <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
          {job.description}
        </p>
      </div>

      {job.notes && (
        <div>
          <p className="text-sm font-medium text-slate-700">
            Additional notes
          </p>
          <div
            className="rich-text mt-1 text-sm text-slate-600"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.notes) }}
          />
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete job"
        message={`Delete "${job.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        theme="danger"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
