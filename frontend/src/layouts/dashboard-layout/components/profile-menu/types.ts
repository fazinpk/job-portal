import type { Admin } from "@/types/auth.types";

export interface ProfileMenuProps {
  admin: Admin | null;
  onLogoutClick: () => void;
}
