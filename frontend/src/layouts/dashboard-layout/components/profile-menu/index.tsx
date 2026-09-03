import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, LogOut, User } from "lucide-react";
import type { ProfileMenuProps } from "./types";

export function ProfileMenu({ admin, onLogoutClick }: ProfileMenuProps) {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
        <User size={16} />
        Profile
        <ChevronDown size={14} />
      </MenuButton>
      <MenuItems className="absolute right-0 z-50 mt-2 w-56 rounded-md border border-slate-200 bg-white p-1 shadow-lg outline-none">
        <div className="px-3 py-2">
          <p className="truncate text-sm font-medium text-slate-900">
            {admin?.name}
          </p>
          <p className="truncate text-xs text-slate-500">{admin?.email}</p>
        </div>
        <div className="my-1 border-t border-slate-200" />
        <MenuItem>
          <button
            type="button"
            onClick={onLogoutClick}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 data-[focus]:bg-red-50"
          >
            <LogOut size={16} />
            Log out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
