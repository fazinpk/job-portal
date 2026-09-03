import { Navigate, Outlet } from "react-router-dom";
import { LoadingView } from "@/components/views/loading";
import { useAuth } from "./hooks";

export function ProtectedRoute() {
  const { status } = useAuth();

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingView />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
