import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    theme: {
      primary: "bg-slate-900 text-white hover:bg-slate-800",
      secondary:
        "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    },
  },
  defaultVariants: {
    theme: "primary",
  },
});
