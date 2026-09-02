import { forwardRef } from 'react'
import type { TextFieldProps } from './types'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, name, required, endAdornment, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        <div className="relative">
          <input
            id={inputId}
            name={name}
            ref={ref}
            className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${
              endAdornment ? 'pr-10' : ''
            } ${error ? 'border-red-500' : 'border-slate-300'}`}
            {...props}
          />
          {endAdornment && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">{endAdornment}</div>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
