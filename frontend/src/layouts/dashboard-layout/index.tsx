import { Outlet } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Sidebar } from './components/sidebar'
import { useDashboardLayoutController } from './hooks'

export function DashboardLayout() {
  const { admin, isLogoutConfirmOpen, isLoggingOut, requestLogout, cancelLogout, confirmLogout } =
    useDashboardLayoutController()

  return (
    <div className="flex h-dvh w-full bg-slate-50">
      <Sidebar />
      <div className="flex min-w-0 grow flex-col">
        <header className="flex h-16 shrink-0 items-center justify-end gap-4 border-b border-slate-200 bg-white px-6">
          <span className="text-sm text-slate-600">{admin?.name}</span>
          <Button theme="secondary" onClick={requestLogout}>
            <LogOut size={16} />
            Log out
          </Button>
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
  )
}
