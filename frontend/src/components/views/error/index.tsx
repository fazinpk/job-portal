interface ErrorViewProps {
  message?: string
  onRetry?: () => void
}

export function ErrorView({ message = 'Something went wrong.', onRetry }: ErrorViewProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 text-center text-sm">
      <p className="text-red-600">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="cursor-pointer text-slate-600 underline">
          Try again
        </button>
      )}
    </div>
  )
}
