import type { ButtonHTMLAttributes } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { buttonVariants } from './consts'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
