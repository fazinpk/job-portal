import { useNavigate } from "react-router-dom";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import { useGetCategoriesQuery } from "@/features/categories/categoriesApi";
import type { JobStatus } from "@/types/job.types";

export function useDashboardController() {
  const navigate = useNavigate();
  const {
    data: stats,
    isLoading,
    isError,
    refetch,
  } = useGetDashboardStatsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const getCategoryName = (categoryId: number) =>
    categories?.find((category) => category.id === categoryId)?.name ??
    `Category ${categoryId}`;

  const goToJobs = (status?: JobStatus) => {
    navigate(status ? `/jobs?status=${status}` : "/jobs");
  };

  return { stats, isLoading, isError, refetch, getCategoryName, goToJobs };
}
