import type { LucideIcon } from "lucide-react";

const THEME_CLASSES = {
  primary: "bg-slate-900 text-white",
  success: "bg-emerald-50 text-emerald-600",
  muted: "bg-slate-100 text-slate-600",
  error: "bg-red-50 text-red-600",
  warning: "bg-amber-50 text-amber-600",
} as const;

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  theme: keyof typeof THEME_CLASSES;
  onClick?: () => void;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  theme,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-colors ${
        onClick ? "cursor-pointer hover:border-slate-300 hover:bg-slate-50" : ""
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${THEME_CLASSES[theme]}`}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-0.5 text-2xl font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
