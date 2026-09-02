import { useEffect } from 'react'
import { useRefreshMutation } from './authApi'

export function useAuthBootstrap() {
  const [refresh] = useRefreshMutation()

  useEffect(() => {
    refresh()
  }, [refresh])
}
