import { LayoutDashboard, Briefcase, Building2 } from 'lucide-react'

export const SIDEBAR_LINKS = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Jobs', path: '/jobs', icon: Briefcase },
  { label: 'Companies', path: '/companies', icon: Building2 },
] as const
