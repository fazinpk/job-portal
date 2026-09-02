import { baseApi } from "@/services/api/baseApi";
import { JOBS_URL, JOB_URL } from "@/services/api/urls.const";
import { tagTypes } from "@/services/api/tags.const";
import type {
  ApiEnvelope,
  PaginatedEnvelope,
  PaginationMeta,
} from "@/types/api.types";
import type { Job, JobFormValues, ListJobsParams } from "@/types/job.types";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<
      { jobs: Job[]; meta: PaginationMeta },
      ListJobsParams | void
    >({
      query: (params) => ({ url: JOBS_URL, params: params ?? undefined }),
      transformResponse: (response: PaginatedEnvelope<Job>) => ({
        jobs: response.data,
        meta: response.meta,
      }),
      providesTags: [tagTypes.GET_JOBS_TAG],
    }),

    getJobById: builder.query<Job, number>({
      query: (id) => JOB_URL(id),
      transformResponse: (response: ApiEnvelope<Job>) => response.data,
      providesTags: (_result, _error, id) => [
        { type: tagTypes.GET_JOB_DETAILS_TAG, id },
      ],
    }),

    createJob: builder.mutation<Job, JobFormValues>({
      query: (body) => ({ url: JOBS_URL, method: "POST", body }),
      transformResponse: (response: ApiEnvelope<Job>) => response.data,
      invalidatesTags: [tagTypes.GET_JOBS_TAG],
    }),

    updateJob: builder.mutation<
      Job,
      { id: number; body: Partial<JobFormValues> }
    >({
      query: ({ id, body }) => ({ url: JOB_URL(id), method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<Job>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        tagTypes.GET_JOBS_TAG,
        { type: tagTypes.GET_JOB_DETAILS_TAG, id },
      ],
    }),

    deleteJob: builder.mutation<void, number>({
      query: (id) => ({ url: JOB_URL(id), method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [
        tagTypes.GET_JOBS_TAG,
        { type: tagTypes.GET_JOB_DETAILS_TAG, id },
      ],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
