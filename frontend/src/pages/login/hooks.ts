import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '@/features/auth/authApi'
import { useAuth } from '@/features/auth/hooks'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { useToast } from '@/components/ui/toast'
import { loginSchema, type LoginFormValues } from './schema'

export function useLoginController() {
  const navigate = useNavigate()
  const { status } = useAuth()
  const { successToast, infoToast } = useToast()
  const [login, { isLoading }] = useLoginMutation()
  const form = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((visible) => !visible)
  }

  const handleForgotPassword = () => {
    infoToast('Contact your system administrator to reset your password.')
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await login(values).unwrap()
      successToast('Logged in successfully.')
      navigate('/')
    } catch (error) {
      form.setError('root', { message: getErrorMessage(error) })
    }
  })

  return {
    form,
    onSubmit,
    isLoading,
    isAuthenticated: status === 'authenticated',
    isPasswordVisible,
    togglePasswordVisibility,
    handleForgotPassword,
  }
}
