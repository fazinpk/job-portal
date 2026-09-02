import { toast } from 'react-toastify'

export function useToast() {
  const successToast = (message: string) => {
    toast.success(message, { theme: 'colored' })
  }

  const errorToast = (message: string) => {
    toast.error(message, { theme: 'colored' })
  }

  return { successToast, errorToast }
}
