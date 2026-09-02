import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppRouter } from '@/routes/AppRouter'
import { useAuthBootstrap } from '@/features/auth/useAuthBootstrap'

function App() {
  useAuthBootstrap()
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
