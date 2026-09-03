import { baseApi } from "@/services/api/baseApi";
import { LOGIN_URL, REFRESH_URL, LOGOUT_URL } from "@/services/api/urls.const";
import { credentialsSet, credentialsCleared } from "./authSlice";
import type { ApiEnvelope } from "@/types/api.types";
import type { Admin, LoginRequest, LoginResponse } from "@/types/auth.types";

interface RefreshResponse {
  accessToken: string;
  admin: Admin;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: LOGIN_URL,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiEnvelope<LoginResponse>) =>
        response.data,
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(credentialsSet(data));
      },
    }),

    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({ url: REFRESH_URL, method: "POST" }),
      transformResponse: (response: ApiEnvelope<RefreshResponse>) =>
        response.data,
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(credentialsSet(data));
        } catch {
          dispatch(credentialsCleared());
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: LOGOUT_URL, method: "POST" }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(credentialsCleared());
      },
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRefreshMutation, 
  useLogoutMutation 
} = authApi;
