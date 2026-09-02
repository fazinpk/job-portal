import { AppRouter } from '@/routes/AppRouter'
import { useAuthBootstrap } from '@/features/auth/useAuthBootstrap'

function App() {
  useAuthBootstrap()
  return <AppRouter />
}

export default App
