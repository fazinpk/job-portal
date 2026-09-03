import { Link } from "react-router-dom";
import { Plus, Search, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingView } from "@/components/views/loading";
import { ErrorView } from "@/components/views/error";
import {
  EXPERIENCE_LEVEL_OPTIONS,
  JOB_STATUS_OPTIONS,
} from "@/features/jobs/job.constants";
import { JobsTable } from "./components/jobs-table";
import { PaginationFooter } from "./components/pagination-footer";
import { useJobListController } from "./hooks";

export function JobListPage() {
  const {
    jobs,
    meta,
    categories,
    isCategoriesError,
    isLoading,
    isError,
    refetch,
    pendingDelete,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
    goToDetails,
    filters,
    setFilter,
    hasActiveFilters,
    clearFilters,
    page,
    setPage,
    searchInput,
    handleSearchChange,
  } = useJobListController();

  const rangeStart =
    meta && meta.total > 0 ? (meta.page - 1) * meta.limit + 1 : 0;
  const rangeEnd = meta ? Math.min(meta.page * meta.limit, meta.total) : 0;

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-end">
          <div className="grow">
            <TextField
              label="Search"
              placeholder="Search by title or description"
              value={searchInput}
              onChange={handleSearchChange}
              startAdornment={<Search size={16} />}
            />
          </div>
          <Select
            label="Category"
            placeholder="All categories"
            value={filters.categoryId ? String(filters.categoryId) : ""}
            onChange={(event) => setFilter("categoryId", event.target.value)}
            error={isCategoriesError ? "Failed to load categories" : undefined}
            options={categories.map((category) => ({
              label: category.name,
              value: String(category.id),
            }))}
          />
          <Select
            label="Experience level"
            placeholder="All levels"
            value={filters.experienceLevel ?? ""}
            onChange={(event) =>
              setFilter("experienceLevel", event.target.value)
            }
            options={EXPERIENCE_LEVEL_OPTIONS}
          />
          <Select
            label="Status"
            placeholder="All statuses"
            value={filters.status ?? ""}
            onChange={(event) => setFilter("status", event.target.value)}
            options={JOB_STATUS_OPTIONS}
          />
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex cursor-pointer items-center gap-1 pb-2 text-sm text-slate-600 hover:text-slate-900 hover:underline"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>
        <Link to="/jobs/new">
          <Button theme="primary">
            <Plus size={16} />
            Create Job
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingView message="Loading jobs..." />}
      {isError && (
        <ErrorView message="Failed to load jobs." onRetry={refetch} />
      )}

      {!isLoading && !isError && (
        <div className="flex min-h-0 grow flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
          <JobsTable
            jobs={jobs}
            onRowClick={goToDetails}
            onDelete={requestDelete}
          />

          {meta && (
            <PaginationFooter
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              total={meta.total}
              page={page}
              totalPages={meta.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete job"
        message={`Delete "${pendingDelete?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        theme="danger"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
