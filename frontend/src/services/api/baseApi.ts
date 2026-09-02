import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getHealth: builder.query<{ success: boolean; message: string }, void>({
      query: () => '/health',
    }),
  }),
})

export const { useGetHealthQuery } = baseApi
