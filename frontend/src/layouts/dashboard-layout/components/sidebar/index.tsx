import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { IconButton } from '@/components/ui/icon-button'
import { SIDEBAR_LINKS } from './consts'
import type { SidebarProps } from './types'

function isLinkActive(pathname: string, linkPath: string) {
  if (linkPath === '/') return pathname === '/'
  return pathname.startsWith(linkPath)
}

export function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation()

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-6">
          <span className="text-lg font-semibold text-slate-900">Job Portal</span>
          <IconButton icon={X} label="Close menu" onClick={onClose} className="md:hidden" />
        </div>
        <nav className="flex flex-col gap-1 overflow-y-auto p-3">
          {SIDEBAR_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
