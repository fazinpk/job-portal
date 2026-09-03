import type { JobStatus } from './job.types'

export interface DashboardStats {
  totalJobs: number
  totalCategories: number
  byStatus: Record<JobStatus, number>
  byCategory: { categoryId: number; count: number }[]
  immediateJoinerCount: number
  totalCompanies: number
}
