export interface PaginationFooterProps {
  rangeStart: number
  rangeEnd: number
  total: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}
