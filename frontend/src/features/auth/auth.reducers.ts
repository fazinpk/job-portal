import type { PayloadAction } from '@reduxjs/toolkit'
import type { Admin } from '@/types/auth.types'
import type { AuthState } from './auth.types'

export const credentialsSetReducer = (
  state: AuthState,
  action: PayloadAction<{ accessToken: string; admin?: Admin }>,
) => {
  state.accessToken = action.payload.accessToken
  if (action.payload.admin) state.admin = action.payload.admin
  state.status = 'authenticated'
}

export const credentialsClearedReducer = (state: AuthState) => {
  state.accessToken = null
  state.admin = null
  state.status = 'unauthenticated'
}
