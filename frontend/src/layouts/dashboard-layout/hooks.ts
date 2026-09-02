import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks'
import { useLogoutMutation } from '@/features/auth/authApi'

export function useDashboardLayoutController() {
  const { admin } = useAuth()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

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
    isLogoutConfirmOpen,
    isLoggingOut,
    requestLogout,
    cancelLogout,
    confirmLogout,
  }
}
