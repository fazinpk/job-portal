import { Navigate } from "react-router-dom";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { useLoginController } from "./hooks";

export function LoginPage() {
  const { form, onSubmit, isLoading, isAuthenticated } = useLoginController();
  
  const {
    register,
    formState: { errors },
  } = form;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-lg font-semibold text-slate-900">Admin login</h1>

        {errors.root && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.root.message}
          </p>
        )}

        <TextField
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" theme="primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}
