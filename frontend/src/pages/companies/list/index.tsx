import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { iconButtonVariants } from "@/components/ui/icon-button/consts";
import { CompanyAvatar } from "@/components/ui/company-avatar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingView } from "@/components/views/loading";
import { ErrorView } from "@/components/views/error";
import { useCompanyListController } from "./hooks";

export function CompanyListPage() {
  const {
    companies,
    isLoading,
    isError,
    refetch,
    pendingDelete,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
    goToEdit,
  } = useCompanyListController();

  if (isLoading) {
    return <LoadingView message="Loading companies..." />;
  }

  if (isError) {
    return <ErrorView message="Failed to load companies." onRetry={refetch} />;
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Companies</h1>
        <Link to="/companies/new">
          <Button theme="primary">
            <Plus size={16} />
            Add Company
          </Button>
        </Link>
      </div>

      <div className="flex min-h-0 grow flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="min-h-0 grow overflow-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-slate-900">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-6 text-center text-slate-500">
                    No companies yet.
                  </td>
                </tr>
              )}
              {companies.map((company) => (
                <tr
                  key={company.id}
                  onClick={() => goToEdit(company.id)}
                  className="cursor-pointer border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CompanyAvatar name={company.name} logoUrl={company.logoUrl} />
                      <span className="text-slate-900">{company.name}</span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/companies/${company.id}/edit`}
                        aria-label="Edit company"
                        title="Edit company"
                        className={iconButtonVariants({ theme: "default" })}
                      >
                        <Pencil size={16} />
                      </Link>
                      <IconButton
                        icon={Trash2}
                        label="Delete company"
                        theme="danger"
                        onClick={() => requestDelete(company.id, company.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete company"
        message={`Delete "${pendingDelete?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        theme="danger"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
