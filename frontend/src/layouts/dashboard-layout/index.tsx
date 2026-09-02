import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks'
import { useLogoutMutation } from '@/features/auth/authApi'
import { Button } from '@/components/ui/button'

export function DashboardLayout() {
  const { admin } = useAuth()
  const [logout] = useLogoutMutation()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <nav className="flex items-center gap-6">
          <span className="text-lg font-semibold text-slate-900">Job Portal Admin</span>
          <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">{admin?.name}</span>
          <Button theme="secondary" onClick={() => logout()}>
            Log out
          </Button>
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
