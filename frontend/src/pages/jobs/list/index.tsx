import { Link } from 'react-router-dom'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IconButton } from '@/components/ui/icon-button'
import { iconButtonVariants } from '@/components/ui/icon-button/consts'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { LoadingView } from '@/components/views/loading'
import { ErrorView } from '@/components/views/error'
import { EXPERIENCE_LEVEL_OPTIONS, JOB_STATUS_THEME } from '@/features/jobs/job.constants'
import { useJobListController } from './hooks'

export function JobListPage() {
  const {
    jobs,
    meta,
    categories,
    isLoading,
    isError,
    refetch,
    pendingDelete,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
    filters,
    setFilter,
    page,
    setPage,
    searchInput,
    handleSearchChange,
  } = useJobListController()

  const rangeStart = meta && meta.total > 0 ? (meta.page - 1) * meta.limit + 1 : 0
  const rangeEnd = meta ? Math.min(meta.page * meta.limit, meta.total) : 0

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex shrink-0 items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Jobs</h1>
        <Link to="/jobs/new">
          <Button theme="primary">
            <Plus size={16} />
            Create Job
          </Button>
        </Link>
      </div>

      <div className="flex shrink-0 items-end gap-4">
        <div className="grow">
          <TextField
            label="Search"
            placeholder="Search by title or description"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <Select
          label="Category"
          placeholder="All categories"
          value={filters.categoryId ? String(filters.categoryId) : ''}
          onChange={(event) => setFilter('categoryId', event.target.value)}
          options={categories.map((category) => ({ label: category.name, value: String(category.id) }))}
        />
        <Select
          label="Experience level"
          placeholder="All levels"
          value={filters.experienceLevel ?? ''}
          onChange={(event) => setFilter('experienceLevel', event.target.value)}
          options={EXPERIENCE_LEVEL_OPTIONS}
        />
      </div>

      {isLoading && <LoadingView message="Loading jobs..." />}
      {isError && <ErrorView message="Failed to load jobs." onRetry={refetch} />}

      {!isLoading && !isError && (
        <div className="flex min-h-0 grow flex-col rounded-lg border border-slate-200 bg-white">
          <div className="min-h-0 grow overflow-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Experience</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                      No jobs found.
                    </td>
                  </tr>
                )}
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-slate-900">{job.title}</td>
                    <td className="px-4 py-3 text-slate-700">{job.category.name}</td>
                    <td className="px-4 py-3 text-slate-700">{job.experienceLevel}</td>
                    <td className="px-4 py-3">
                      <Badge theme={JOB_STATUS_THEME[job.status]}>{job.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/jobs/${job.id}/edit`}
                          aria-label="Edit job"
                          title="Edit job"
                          className={iconButtonVariants({ theme: 'default' })}
                        >
                          <Pencil size={16} />
                        </Link>
                        <IconButton
                          icon={Trash2}
                          label="Delete job"
                          theme="danger"
                          onClick={() => requestDelete(job.id, job.title)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {meta && (
            <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-4 py-3">
              <span className="text-sm text-slate-600">
                Showing {rangeStart}–{rangeEnd} of {meta.total} jobs
              </span>
              {meta.totalPages > 1 && (
                <div className="flex items-center gap-3">
                  <IconButton
                    icon={ChevronLeft}
                    label="Previous page"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                  />
                  <span className="text-sm text-slate-600">
                    Page {meta.page} of {meta.totalPages}
                  </span>
                  <IconButton
                    icon={ChevronRight}
                    label="Next page"
                    disabled={page >= meta.totalPages}
                    onClick={() => setPage(page + 1)}
                  />
                </div>
              )}
            </div>
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
  )
}
