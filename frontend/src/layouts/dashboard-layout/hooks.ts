import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks'
import { useLogoutMutation } from '@/features/auth/authApi'

function getPageTitle(pathname: string): string {
  if (pathname === '/') return 'Dashboard'
  if (pathname === '/jobs') return 'Jobs'
  if (pathname === '/jobs/new') return 'Create Job'
  if (/^\/jobs\/[^/]+\/edit$/.test(pathname)) return 'Edit Job'
  return ''
}

export function useDashboardLayoutController() {
  const { admin } = useAuth()
  const { pathname } = useLocation()
  const pageTitle = getPageTitle(pathname)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((open) => !open)
  }

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }

  const requestLogout = () => {
    setIsLogoutConfirmOpen(true)
  }

  const cancelLogout = () => {
    setIsLogoutConfirmOpen(false)
  }

  const confirmLogout = async () => {
    await logout()
    setIsLogoutConfirmOpen(false)
  }

  return {
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
  }
}
