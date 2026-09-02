import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import { useGetCategoriesQuery } from "@/features/categories/categoriesApi";

export function useDashboardController() {
  const { data: stats, isLoading, isError, refetch } = useGetDashboardStatsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const getCategoryName = (categoryId: number) =>
    categories?.find((category) => category.id === categoryId)?.name ??
    `Category ${categoryId}`;

  return { stats, isLoading, isError, refetch, getCategoryName };
}
