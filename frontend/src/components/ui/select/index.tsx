import { forwardRef } from "react";
import type { SelectProps } from "./types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, name, options, placeholder, required, ...props }, ref) => {
    const selectId = id ?? name;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        <select
          id={selectId}
          name={name}
          ref={ref}
          className={`rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${
            error ? "border-red-500" : "border-slate-300"
          }`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
