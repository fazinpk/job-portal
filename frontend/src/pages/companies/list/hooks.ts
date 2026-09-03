import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
} from "@/features/companies/companiesApi";
import { useToast } from "@/components/ui/toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useCompanyListController() {
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();
  const { data: companies, isLoading, isError, refetch } = useGetCompaniesQuery();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const [pendingDelete, setPendingDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const requestDelete = (id: number, name: string) => {
    setPendingDelete({ id, name });
  };

  const cancelDelete = () => {
    setPendingDelete(null);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;

    try {
      await deleteCompany(pendingDelete.id).unwrap();
      successToast("Company deleted successfully.");
    } catch (error) {
      errorToast(getErrorMessage(error));
    } finally {
      setPendingDelete(null);
    }
  };

  const goToEdit = (id: number) => {
    navigate(`/companies/${id}/edit`);
  };

  return {
    companies: companies ?? [],
    isLoading,
    isError,
    refetch,
    pendingDelete,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
    goToEdit,
  };
}
