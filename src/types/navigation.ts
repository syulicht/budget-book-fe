import type { LucideIcon } from 'lucide-react'

export type SidebarRoutePath = '/dashboard' | '/budgets' | '/analytics' | '/settings'

export type SidebarNavKey = 'dashboard' | 'budgets' | 'analytics' | 'settings'

export interface SidebarNavItem {
  key: SidebarNavKey
  label: string
  to: SidebarRoutePath
  Icon: LucideIcon
}
