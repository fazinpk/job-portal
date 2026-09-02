import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Admin } from '@/types/auth.types'

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

interface AuthState {
  accessToken: string | null
  admin: Admin | null
  status: AuthStatus
}

const initialState: AuthState = {
  accessToken: null,
  admin: null,
  status: 'checking',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    credentialsSet: (state, action: PayloadAction<{ accessToken: string; admin: Admin }>) => {
      state.accessToken = action.payload.accessToken
      state.admin = action.payload.admin
      state.status = 'authenticated'
    },
    credentialsCleared: (state) => {
      state.accessToken = null
      state.admin = null
      state.status = 'unauthenticated'
    },
  },
})

export const { credentialsSet, credentialsCleared } = authSlice.actions
export default authSlice.reducer
