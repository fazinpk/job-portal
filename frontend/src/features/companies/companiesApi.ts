import { baseApi } from '@/services/api/baseApi'
import { COMPANIES_URL, COMPANY_URL } from '@/services/api/urls.const'
import { tagTypes } from '@/services/api/tags.const'
import type { ApiEnvelope } from '@/types/api.types'
import type { Company } from '@/types/company.types'

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => COMPANIES_URL,
      transformResponse: (response: ApiEnvelope<Company[]>) => response.data,
      providesTags: [tagTypes.GET_COMPANIES_TAG],
    }),

    createCompany: builder.mutation<Company, FormData>({
      query: (body) => ({ url: COMPANIES_URL, method: 'POST', body }),
      transformResponse: (response: ApiEnvelope<Company>) => response.data,
      invalidatesTags: [tagTypes.GET_COMPANIES_TAG],
    }),

    updateCompany: builder.mutation<Company, { id: number; body: FormData }>({
      query: ({ id, body }) => ({ url: COMPANY_URL(id), method: 'PATCH', body }),
      transformResponse: (response: ApiEnvelope<Company>) => response.data,
      invalidatesTags: [
        tagTypes.GET_COMPANIES_TAG,
        tagTypes.GET_JOBS_TAG,
        tagTypes.GET_JOB_DETAILS_TAG,
      ],
    }),

    deleteCompany: builder.mutation<void, number>({
      query: (id) => ({ url: COMPANY_URL(id), method: 'DELETE' }),
      invalidatesTags: [
        tagTypes.GET_COMPANIES_TAG,
        tagTypes.GET_JOBS_TAG,
        tagTypes.GET_JOB_DETAILS_TAG,
      ],
    }),
  }),
})

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi
