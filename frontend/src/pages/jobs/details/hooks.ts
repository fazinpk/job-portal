import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetJobByIdQuery, useDeleteJobMutation } from '@/features/jobs/jobsApi'
import { useToast } from '@/components/ui/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'

export function useJobDetailsController() {
  const { id } = useParams<{ id: string }>()
  const jobId = Number(id)
  const navigate = useNavigate()
  const { successToast, errorToast } = useToast()

  const { data: job, isLoading, isError } = useGetJobByIdQuery(jobId)
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation()
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const requestDelete = () => {
    setIsDeleteConfirmOpen(true)
  }

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false)
  }

  const confirmDelete = async () => {
    try {
      await deleteJob(jobId).unwrap()
      successToast('Job deleted successfully.')
      navigate('/jobs')
    } catch (error) {
      errorToast(getErrorMessage(error))
      setIsDeleteConfirmOpen(false)
    }
  }

  return {
    job,
    isLoading,
    isError,
    isDeleteConfirmOpen,
    isDeleting,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}
