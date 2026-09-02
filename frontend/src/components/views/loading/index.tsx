interface LoadingViewProps {
  message?: string;
}

export function LoadingView({ message = "Loading..." }: LoadingViewProps) {
  return (
    <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-500">
      {message}
    </div>
  );
}
