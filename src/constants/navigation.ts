import { BarChart3, DollarSign, LayoutDashboard, Settings } from 'lucide-react'

import type { SidebarNavItem } from '@/types/navigation'

export const DEFAULT_SIDEBAR_ITEMS: readonly SidebarNavItem[] = [
  { key: 'dashboard', label: 'ダッシュボード', to: '/dashboard', Icon: LayoutDashboard },
  { key: 'transactions', label: '収支管理', to: '/transactions', Icon: DollarSign },
  { key: 'analytics', label: '分析表示', to: '/analytics', Icon: BarChart3 },
  { key: 'master', label: 'マスタ管理', to: '/master', Icon: Settings },
]
