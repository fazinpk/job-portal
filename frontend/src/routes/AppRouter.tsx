import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from '@/pages/login'
import { DashboardPage } from '@/pages/dashboard'
import { JobListPage } from '@/pages/jobs/list'
import { JobFormPage } from '@/pages/jobs/form'
import { JobDetailsPage } from '@/pages/jobs/details'
import { NotFoundPage } from '@/pages/not-found'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { DashboardLayout } from '@/layouts/dashboard-layout'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/jobs', element: <JobListPage /> },
          { path: '/jobs/new', element: <JobFormPage /> },
          { path: '/jobs/:id', element: <JobDetailsPage /> },
          { path: '/jobs/:id/edit', element: <JobFormPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
