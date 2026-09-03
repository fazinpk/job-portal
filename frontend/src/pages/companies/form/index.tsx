import { useRef } from "react";
import { Link } from "react-router-dom";
import { ImageUp, X } from "lucide-react";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { LoadingView } from "@/components/views/loading";
import { useCompanyFormController } from "./hooks";

export function CompanyFormPage() {
  const {
    form,
    onSubmit,
    isEditMode,
    isSubmitting,
    isLoadingCompany,
    logoPreview,
    hasPendingLogoFile,
    handleLogoChange,
  } = useCompanyFormController();
  const {
    register,
    formState: { errors },
  } = form;
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoadingCompany) {
    return <LoadingView message="Loading company..." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-slate-900">
        {isEditMode ? "Edit Company" : "Add Company"}
      </h1>

      <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
        {errors.root && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.root.message}
          </p>
        )}

        <TextField
          label="Company name"
          placeholder="e.g. Nimbus Systems"
          required
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Logo</label>
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt=""
                className="h-16 w-16 rounded-full object-cover ring-1 ring-slate-200"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400 ring-1 ring-slate-200">
                No logo
              </div>
            )}

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  theme="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageUp size={16} />
                  {logoPreview ? "Change logo" : "Upload logo"}
                </Button>
                {hasPendingLogoFile && (
                  <Button
                    type="button"
                    theme="secondary"
                    onClick={() => {
                      handleLogoChange(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    <X size={16} />
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-slate-400">
                PNG, JPEG, or WEBP. Max 2MB.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) =>
                handleLogoChange(event.target.files?.[0] ?? null)
              }
              className="hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" theme="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Add Company"}
          </Button>
          <Link to="/companies">
            <Button type="button" theme="secondary">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
