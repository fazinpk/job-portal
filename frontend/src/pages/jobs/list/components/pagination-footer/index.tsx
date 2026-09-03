import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from '@/components/ui/icon-button'
import type { PaginationFooterProps } from './types'

export function PaginationFooter({
  rangeStart,
  rangeEnd,
  total,
  page,
  totalPages,
  onPageChange,
}: PaginationFooterProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-4 py-3">
      <span className="text-sm text-slate-600">
        Showing {rangeStart}–{rangeEnd} of {total} jobs
      </span>
      {totalPages > 1 && (
        <div className="flex items-center gap-3">
          <IconButton
            icon={ChevronLeft}
            label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          />
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <IconButton
            icon={ChevronRight}
            label="Next page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          />
        </div>
      )}
    </div>
  )
}
