import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Sidebar } from "./components/sidebar";
import { ProfileMenu } from "./components/profile-menu";
import { useDashboardLayoutController } from "./hooks";

export function DashboardLayout() {
  const {
    admin,
    pageTitle,
    isLogoutConfirmOpen,
    isLoggingOut,
    requestLogout,
    cancelLogout,
    confirmLogout,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    closeMobileSidebar,
  } = useDashboardLayoutController();

  return (
    <div className="flex h-dvh w-full bg-slate-50">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />
      <div className="flex min-w-0 grow flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 md:px-6">
          <div className="flex items-center gap-3">
            <IconButton
              icon={Menu}
              label="Open menu"
              onClick={toggleMobileSidebar}
              className="md:hidden"
            />
            <h1 className="text-lg font-semibold text-slate-900">
              {pageTitle}
            </h1>
          </div>
          <ProfileMenu admin={admin} onLogoutClick={requestLogout} />
        </header>
        <main className="min-h-0 grow overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <ConfirmDialog
        isOpen={isLogoutConfirmOpen}
        title="Log out"
        message="Are you sure you want to log out?"
        confirmLabel="Log out"
        theme="danger"
        isLoading={isLoggingOut}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}
