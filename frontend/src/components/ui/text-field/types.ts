import type { InputHTMLAttributes, ReactNode } from 'react'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}
