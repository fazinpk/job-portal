import { LayoutDashboard, Briefcase } from 'lucide-react'

export const SIDEBAR_LINKS = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Jobs', path: '/jobs', icon: Briefcase },
] as const
