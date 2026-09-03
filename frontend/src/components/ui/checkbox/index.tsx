import { forwardRef } from 'react'
import type { CheckboxProps } from './types'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, name, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <label
        htmlFor={inputId}
        className="flex items-center gap-2 text-sm font-medium text-slate-700"
      >
        <input
          id={inputId}
          name={name}
          type="checkbox"
          ref={ref}
          className="h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-2 focus:ring-slate-400"
          {...props}
        />
        {label}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
