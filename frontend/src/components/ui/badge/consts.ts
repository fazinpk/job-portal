import { tv } from 'tailwind-variants'

export const badgeVariants = tv({
  base: 'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
  variants: {
    theme: {
      muted: 'border-slate-300 bg-slate-100 text-slate-600',
      success: 'border-emerald-300 bg-emerald-50 text-emerald-700',
      error: 'border-red-300 bg-red-50 text-red-700',
    },
  },
  defaultVariants: {
    theme: 'muted',
  },
})
