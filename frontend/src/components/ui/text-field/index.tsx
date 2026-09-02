import { forwardRef } from 'react'
import type { TextFieldProps } from './types'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, name, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <input
          id={inputId}
          name={name}
          ref={ref}
          className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${
            error ? 'border-red-500' : 'border-slate-300'
          }`}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
