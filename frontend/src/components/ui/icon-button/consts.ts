import { tv } from 'tailwind-variants'

export const iconButtonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md p-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    theme: {
      default: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      danger: 'text-red-600 hover:bg-red-50 hover:text-red-700',
    },
  },
  defaultVariants: {
    theme: 'default',
  },
})
