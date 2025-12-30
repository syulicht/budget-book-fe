import { BarChart3, DollarSign, LayoutDashboard, Settings } from 'lucide-react'

import type { LucideIcon } from 'lucide-react'
import type { FC, MouseEventHandler } from 'react'

const navItems = [
  { key: 'dashboard', label: 'ダッシュボード', Icon: LayoutDashboard },
  { key: 'transactions', label: '収支管理', Icon: DollarSign },
  { key: 'analytics', label: '分析表示', Icon: BarChart3 },
  { key: 'master', label: 'マスタ管理', Icon: Settings },
] as const satisfies ReadonlyArray<{
  key: 'dashboard' | 'transactions' | 'analytics' | 'master'
  label: string
  Icon: LucideIcon
}>

type NavItemKey = (typeof navItems)[number]['key']

interface Props {
  userName: string
  onSelect?: (key: NavItemKey) => void
}

export const Sidebar: FC<Props> = ({ userName, onSelect }) => {
  const handleClick =
    (key: NavItemKey): MouseEventHandler<HTMLButtonElement> =>
    () => {
      if (onSelect) {
        onSelect(key)
      }
    }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[200px] flex-col bg-background text-primary-text">
      <div className="flex items-center mx-[8px] px-[8px] pt-[40px] pb-[16px] border-b border-border">
        <img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=User"
          alt="User Avatar"
          className="h-[50px] w-[50px] rounded-full"
        />
        <span className="ml-[16px] text-[18px]">{userName}</span>
      </div>

      <nav className="mt-2 flex flex-1 flex-col">
        {navItems.map((item) => {
          const Icon = item.Icon

          return (
            <button
              key={item.key}
              type="button"
              onClick={handleClick(item.key)}
              className="flex items-center gap-[16px] p-[8px] text-[14px] cursor-pointer"
            >
              <span className="flex h-[18px] w-[18px] items-center justify-center">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
