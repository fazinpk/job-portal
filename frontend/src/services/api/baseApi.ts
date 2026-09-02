import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import type { RootState } from '@/app/store'
import { credentialsSet, credentialsCleared } from '@/features/auth/authSlice'
import { HEALTH_URL, REFRESH_URL } from './urls.const'
import { tagTypes } from './tags.const'
import type { ApiEnvelope } from '@/types/api.types'

const mutex = new Mutex()

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock()
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401 && api.endpoint !== 'login') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await rawBaseQuery({ url: REFRESH_URL, method: 'POST' }, api, extraOptions)
        if (refreshResult.data) {
          const envelope = refreshResult.data as ApiEnvelope<{ accessToken: string }>
          api.dispatch(credentialsSet({ accessToken: envelope.data.accessToken }))
          result = await rawBaseQuery(args, api, extraOptions)
        } else {
          api.dispatch(credentialsCleared())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await rawBaseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(tagTypes),
  endpoints: (builder) => ({
    getHealth: builder.query<{ success: boolean; message: string }, void>({
      query: () => HEALTH_URL,
    }),
  }),
})

export const { useGetHealthQuery } = baseApi
