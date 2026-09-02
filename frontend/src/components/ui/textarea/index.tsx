import { forwardRef } from 'react'
import type { TextareaProps } from './types'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, name, required, ...props }, ref) => {
    const textareaId = id ?? name

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={textareaId} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        <textarea
          id={textareaId}
          name={name}
          ref={ref}
          rows={4}
          className={`rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${
            error ? 'border-red-500' : 'border-slate-300'
          }`}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
