import { useAppSelector } from '@/app/hooks'

export function useAuth() {
  const { admin, status } = useAppSelector((state) => state.auth)

  return { 
    admin, 
    status, 
    isAuthenticated: status === 'authenticated' 
  }
}
