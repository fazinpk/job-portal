import { baseApi } from '@/services/api/baseApi'
import { CATEGORIES_URL } from '@/services/api/urls.const'
import type { ApiEnvelope } from '@/types/api.types'
import type { Category } from '@/types/job.types'

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => CATEGORIES_URL,
      transformResponse: (response: ApiEnvelope<Category[]>) => response.data,
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
