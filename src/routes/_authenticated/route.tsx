import { Outlet, createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useAuth } from 'react-oidc-context'

import type { SidebarNavItem, SidebarNavKey } from '@/types/navigation'

import Sidebar from '@/components/layouts/Sidebar/Sidebar'
import { DEFAULT_SIDEBAR_ITEMS } from '@/constants/navigation'

let hasRequestedSigninRedirect = false

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

const getActiveNavKey = (pathname: string): SidebarNavKey | null => {
  const activeItem = DEFAULT_SIDEBAR_ITEMS.find(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`)
  )

  return activeItem?.key ?? null
}

function AuthenticatedLayout(): React.JSX.Element {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const activeNavKey = useMemo(() => getActiveNavKey(location.pathname), [location.pathname])

  useEffect(() => {
    if (auth.isAuthenticated) {
      hasRequestedSigninRedirect = false
      return
    }

    if (auth.isLoading || auth.error) {
      return
    }

    if (auth.activeNavigator === 'signinRedirect' || hasRequestedSigninRedirect) {
      return
    }

    hasRequestedSigninRedirect = true
    void auth.signinRedirect()
  }, [auth])

  const handleSelect = (item: SidebarNavItem): void => {
    if (item.to === location.pathname) {
      return
    }

    void navigate({ to: item.to })
  }

  const userNameClaim = auth.user?.profile['cognito:username']
  const userName = typeof userNameClaim === 'string' ? userNameClaim : 'ユーザー'

  if (auth.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-[24px]">
        <LoaderCircle className="h-[28px] w-[28px] animate-spin text-primary-text" />
      </div>
    )
  }

  if (auth.error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-[16px] bg-background px-[24px] text-center text-primary-text">
        <h1 className="text-[24px] font-semibold">認証エラーが発生しました</h1>
        <p className="text-[14px] text-red-400">{auth.error.message}</p>
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-[24px]">
        <LoaderCircle className="h-[28px] w-[28px] animate-spin text-primary-text" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-primary-text">
      <Sidebar
        userName={userName}
        items={DEFAULT_SIDEBAR_ITEMS}
        activeKey={activeNavKey}
        onSelect={handleSelect}
      />
      <main className="ml-[200px] min-h-screen p-[24px]">
        <Outlet />
      </main>
    </div>
  )
}
