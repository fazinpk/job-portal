import { Link, useLocation } from 'react-router-dom'
import { SIDEBAR_LINKS } from './consts'

function isLinkActive(pathname: string, linkPath: string) {
  if (linkPath === '/') return pathname === '/'
  return pathname.startsWith(linkPath)
}

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
        <span className="text-lg font-semibold text-slate-900">Job Portal</span>
      </div>
      <nav className="flex flex-col gap-1 overflow-y-auto p-3">
        {SIDEBAR_LINKS.map((link) => {
          const active = isLinkActive(pathname, link.path)
          return (
            <Link
              key={link.path}
              to={link.path}
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
  )
}
