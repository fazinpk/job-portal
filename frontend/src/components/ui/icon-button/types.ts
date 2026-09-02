import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { VariantProps } from 'tailwind-variants'
import type { iconButtonVariants } from './consts'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon
  label: string
  size?: number
}
