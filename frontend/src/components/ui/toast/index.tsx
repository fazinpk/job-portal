import { toast } from 'react-toastify'

export function useToast() {
  const successToast = (message: string) => {
    toast.success(message, { theme: 'colored' })
  }

  const errorToast = (message: string) => {
    toast.error(message, { theme: 'colored' })
  }

  const infoToast = (message: string) => {
    toast.info(message, { theme: 'colored' })
  }

  return { successToast, errorToast, infoToast }
}
