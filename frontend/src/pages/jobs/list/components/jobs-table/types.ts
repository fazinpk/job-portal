import type { Job } from '@/types/job.types'

export interface JobsTableProps {
  jobs: Job[]
  onRowClick: (id: number) => void
  onDelete: (id: number, title: string) => void
}
