import { StatCard } from './components/StatCard'
import { useDashboardController } from './hooks'
import { LoadingView } from '@/components/views/loading'
import { ErrorView } from '@/components/views/error'

export function DashboardPage() {
  const { stats, isLoading, isError, refetch, getCategoryName } = useDashboardController()

  if (isLoading) {
    return <LoadingView message="Loading dashboard..." />
  }

  if (isError || !stats) {
    return <ErrorView message="Failed to load dashboard stats." onRetry={refetch} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Jobs" value={stats.totalJobs} />
        <StatCard label="Published" value={stats.byStatus.PUBLISHED} />
        <StatCard label="Draft" value={stats.byStatus.DRAFT} />
        <StatCard label="Closed" value={stats.byStatus.CLOSED} />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Jobs by category</h2>
        <ul className="flex flex-col gap-2">
          {stats.byCategory.map((row) => (
            <li key={row.categoryId} className="flex items-center justify-between text-sm">
              <span className="text-slate-700">{getCategoryName(row.categoryId)}</span>
              <span className="font-medium text-slate-900">{row.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
