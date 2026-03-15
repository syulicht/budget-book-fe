import type { SidebarNavItem, SidebarNavKey } from '@/types/navigation'

const DEFAULT_AVATAR_URL = 'https://api.dicebear.com/7.x/bottts/svg?seed=User'

interface Props {
  userName: string
  items: readonly SidebarNavItem[]
  activeKey: SidebarNavKey | null
  onSelect?: (item: SidebarNavItem) => void
  avatarUrl?: string
}

export const Sidebar = ({
  userName,
  items,
  activeKey,
  onSelect,
  avatarUrl,
}: Props): React.JSX.Element => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[200px] flex-col bg-background text-primary-text">
      <div className="mx-[8px] flex items-center border-b border-border px-[8px] pb-[16px] pt-[40px]">
        <img
          src={avatarUrl ?? DEFAULT_AVATAR_URL}
          alt={`${userName} avatar`}
          className="h-[50px] w-[50px] rounded-full"
        />
        <span className="ml-[16px] text-[18px]">{userName}</span>
      </div>

      <nav className="mt-2 flex flex-1 flex-col" aria-label="サイドバー">
        <ul className="flex flex-1 flex-col gap-[2px] px-[8px]">
          {items.map((item) => {
            const Icon = item.Icon
            const isActive = item.key === activeKey
            const ariaCurrent = isActive ? 'page' : undefined

            return (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => onSelect?.(item)}
                  aria-current={ariaCurrent}
                  className={[
                    'flex w-full cursor-pointer items-center gap-[16px] rounded-[8px] p-[8px] text-left text-[14px] transition-colors',
                    isActive ? 'bg-border font-semibold' : 'hover:bg-border/60',
                  ].join(' ')}
                >
                  <span className="flex h-[18px] w-[18px] items-center justify-center">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
