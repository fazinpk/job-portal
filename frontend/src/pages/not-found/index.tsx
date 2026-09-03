import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">404</h1>
      <p className="text-sm text-slate-600">This page doesn't exist.</p>
      <Link to="/">
        <Button theme="primary">Go to Dashboard</Button>
      </Link>
    </div>
  )
}
