import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
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
        <div className="relative">
          <select
            id={selectId}
            name={name}
            ref={ref}
            className={`w-full cursor-pointer appearance-none rounded-md border bg-white px-3 py-2 pr-9 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${
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
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
