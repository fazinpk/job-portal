import type { SelectOption } from '@/components/ui/select/types'
import type { BadgeProps } from '@/components/ui/badge/types'
import type { JobStatus } from '@/types/job.types'

export const EXPERIENCE_LEVEL_OPTIONS: SelectOption[] = [
  { label: 'Entry', value: 'ENTRY' },
  { label: 'Mid', value: 'MID' },
  { label: 'Senior', value: 'SENIOR' },
  { label: 'Lead', value: 'LEAD' },
]

export const EMPLOYMENT_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Full-time', value: 'FULL_TIME' },
  { label: 'Part-time', value: 'PART_TIME' },
  { label: 'Contract', value: 'CONTRACT' },
  { label: 'Internship', value: 'INTERNSHIP' },
]

export const JOB_STATUS_OPTIONS: SelectOption[] = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
  { label: 'Closed', value: 'CLOSED' },
]

export const JOB_STATUS_THEME: Record<JobStatus, BadgeProps['theme']> = {
  DRAFT: 'muted',
  PUBLISHED: 'success',
  CLOSED: 'error',
}
