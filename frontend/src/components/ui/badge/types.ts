import type { HTMLAttributes } from 'react'
import type { VariantProps } from 'tailwind-variants'
import type { badgeVariants } from './consts'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
