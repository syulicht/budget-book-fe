import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from 'react-oidc-context'

import { budgetsQueryOptions, useBudgets } from '@/features/budgets/hooks/useBudgets'
import { userManager } from '@/lib/auth/userManager'

export const Route = createFileRoute('/_authenticated/budgets')({
  loader: async ({ context }) => {
    const currentUser = await userManager.getUser()
    if (!currentUser || currentUser.expired) {
      return
    }

    try {
      await context.queryClient.ensureQueryData(budgetsQueryOptions())
    } catch (error) {
      console.error('Failed to prefetch budgets in budgets loader', error)
    }
  },
  component: BudgetsPage,
})

function BudgetsPage(): React.JSX.Element {
  const auth = useAuth()
  const budgetsQuery = useBudgets({ enabled: auth.isAuthenticated })
  const budgetsCount = budgetsQuery.data?.budgets.length ?? 0
  const budgetsErrorMessage =
    budgetsQuery.error instanceof Error
      ? budgetsQuery.error.message
      : '不明なエラーが発生しました。'

  return (
    <section className="max-w-[720px]">
      <h1 className="text-[28px] font-semibold">収支管理</h1>

      {budgetsQuery.isLoading ? (
        <p className="mt-[16px] text-[14px]">予算データを取得中...</p>
      ) : null}
      {budgetsQuery.isSuccess ? (
        <p className="mt-[16px] text-[14px] text-green-400">
          GET /budgets 成功: {budgetsCount} 件取得
        </p>
      ) : null}
      {budgetsQuery.isFetching && !budgetsQuery.isLoading ? (
        <p className="mt-[16px] text-[14px] text-primary-text/80">最新データへ更新中...</p>
      ) : null}
      {budgetsQuery.isError ? (
        <p className="mt-[16px] text-[14px] text-red-400">
          GET /budgets の呼び出しに失敗しました: {budgetsErrorMessage}
        </p>
      ) : null}
    </section>
  )
}
