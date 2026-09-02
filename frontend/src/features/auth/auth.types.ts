import type { Admin } from "@/types/auth.types";

export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthState {
  accessToken: string | null;
  admin: Admin | null;
  status: AuthStatus;
}
