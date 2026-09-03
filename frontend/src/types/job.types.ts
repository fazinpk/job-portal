export type ExperienceLevel = 'ENTRY' | 'MID' | 'SENIOR' | 'LEAD'
export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP'
export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED'

export interface Category {
  id: number
  name: string
}

export interface Job {
  id: number
  title: string
  company: string
  description: string
  location: string
  experienceLevel: ExperienceLevel
  experienceYears: string | null
  employmentType: EmploymentType
  salaryMin: number | null
  salaryMax: number | null
  notes: string | null
  isImmediateJoiner: boolean
  status: JobStatus
  createdAt: string
  updatedAt: string
  categoryId: number
  createdById: number
  category: Category
}

export interface JobFormValues {
  title: string
  company: string
  description: string
  location: string
  categoryId: number
  experienceLevel: ExperienceLevel
  experienceYears?: string
  employmentType: EmploymentType
  salaryMin?: number
  salaryMax?: number
  notes?: string
  isImmediateJoiner?: boolean
  status?: JobStatus
}

export interface ListJobsParams {
  page?: number
  limit?: number
  categoryId?: number
  experienceLevel?: ExperienceLevel
  employmentType?: EmploymentType
  status?: JobStatus
  search?: string
}
