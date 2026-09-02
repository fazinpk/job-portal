import { baseApi } from '@/services/api/baseApi'
import { DASHBOARD_STATS_URL } from '@/services/api/urls.const'
import type { ApiEnvelope } from '@/types/api.types'
import type { DashboardStats } from '@/types/dashboard.types'

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => DASHBOARD_STATS_URL,
      transformResponse: (response: ApiEnvelope<DashboardStats>) => response.data,
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardApi
