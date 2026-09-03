import { Briefcase, CheckCircle2, FileEdit, XCircle } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { useDashboardController } from "./hooks";
import { LoadingView } from "@/components/views/loading";
import { ErrorView } from "@/components/views/error";

export function DashboardPage() {
  const { stats, isLoading, isError, refetch, getCategoryName, goToJobs } =
    useDashboardController();

  if (isLoading) {
    return <LoadingView message="Loading dashboard..." />;
  }

  if (isError || !stats) {
    return (
      <ErrorView message="Failed to load dashboard stats." onRetry={refetch} />
    );
  }

  const maxCategoryCount = Math.max(
    1,
    ...stats.byCategory.map((row) => row.count),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Total Jobs"
          value={stats.totalJobs}
          icon={Briefcase}
          theme="primary"
          onClick={() => goToJobs()}
        />
        <StatCard
          label="Published"
          value={stats.byStatus.PUBLISHED}
          icon={CheckCircle2}
          theme="success"
          onClick={() => goToJobs("PUBLISHED")}
        />
        <StatCard
          label="Draft"
          value={stats.byStatus.DRAFT}
          icon={FileEdit}
          theme="muted"
          onClick={() => goToJobs("DRAFT")}
        />
        <StatCard
          label="Closed"
          value={stats.byStatus.CLOSED}
          icon={XCircle}
          theme="error"
          onClick={() => goToJobs("CLOSED")}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Jobs by category
        </h2>
        <ul className="flex flex-col gap-3">
          {stats.byCategory.map((row) => (
            <li
              key={row.categoryId}
              className="flex items-center gap-3 text-sm"
            >
              <span className="w-32 shrink-0 truncate text-slate-700">
                {getCategoryName(row.categoryId)}
              </span>
              <div className="h-2 grow rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-slate-900"
                  style={{ width: `${(row.count / maxCategoryCount) * 100}%` }}
                />
              </div>
              <span className="w-6 shrink-0 text-right font-medium text-slate-900">
                {row.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
