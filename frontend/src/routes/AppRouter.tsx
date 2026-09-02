import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/login', element: <div>Login page</div> },
  { path: '/', element: <div>Dashboard</div> },
  { path: '*', element: <div>404 - page not found</div> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
