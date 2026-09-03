import { useState, type ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useGetJobsQuery, useDeleteJobMutation } from "@/features/jobs/jobsApi";
import { useGetCategoriesQuery } from "@/features/categories/categoriesApi";
import { useToast } from "@/components/ui/toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { ExperienceLevel } from "@/types/job.types";

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;

export function useJobListController() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { successToast, errorToast } = useToast();

  const page = Number(searchParams.get("page") ?? "1");
  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined;
  const experienceLevel =
    (searchParams.get("experienceLevel") as ExperienceLevel | null) ??
    undefined;
  const search = searchParams.get("search") ?? undefined;

  const [searchInput, setSearchInput] = useState(search ?? "");

  const { data, isLoading, isError, refetch } = useGetJobsQuery({
    page,
    limit: PAGE_SIZE,
    categoryId,
    experienceLevel,
    search,
  });
  const { data: categories } = useGetCategoriesQuery();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const [pendingDelete, setPendingDelete] = useState<{ id: number; title: string } | null>(null);

  const requestDelete = (id: number, title: string) => {
    setPendingDelete({ id, title });
  };

  const cancelDelete = () => {
    setPendingDelete(null);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;

    try {
      await deleteJob(pendingDelete.id).unwrap();
      successToast("Job deleted successfully.");
    } catch (error) {
      errorToast(getErrorMessage(error));
    } finally {
      setPendingDelete(null);
    }
  };

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  };

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  const goToDetails = (id: number) => {
    navigate(`/jobs/${id}`);
  };

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setFilter("search", value);
  }, SEARCH_DEBOUNCE_MS);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    debouncedSetSearch(event.target.value);
  };

  return {
    jobs: data?.jobs ?? [],
    meta: data?.meta,
    categories: categories ?? [],
    isLoading,
    isError,
    refetch,
    pendingDelete,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
    goToDetails,
    filters: { categoryId, experienceLevel },
    setFilter,
    page,
    setPage,
    searchInput,
    handleSearchChange,
  };
}
