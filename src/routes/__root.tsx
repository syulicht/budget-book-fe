import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { RouterContext } from '@/lib/routerContext'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootComponent(): React.JSX.Element {
  return <Outlet />
}

function NotFoundComponent(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-[16px] bg-background px-[24px] text-center text-primary-text">
      <h1 className="text-[28px] font-semibold">ページが見つかりません</h1>
      <p className="text-[14px] text-primary-text/80">
        URLを確認するか、ダッシュボードから目的のページへ移動してください。
      </p>
      <Link
        to="/dashboard"
        className="rounded-[8px] bg-border px-[16px] py-[10px] text-[14px] font-medium transition-colors hover:bg-border/80"
      >
        ダッシュボードへ戻る
      </Link>
    </div>
  )
}
