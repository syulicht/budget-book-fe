import type { LucideIcon } from 'lucide-react'

export type SidebarNavKey = 'dashboard' | 'transactions' | 'analytics' | 'master'

export interface SidebarNavItem {
  key: SidebarNavKey
  label: string
  to: string
  Icon: LucideIcon
}
