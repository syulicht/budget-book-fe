import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from 'react-oidc-context'

import { useAccessToken } from '@/features/auth/hooks/useAccessToken'
import { getBudgets } from '@/features/budgets/api/getBudgets'

type BudgetsProbeState = 'idle' | 'loading' | 'success' | 'error'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage(): React.JSX.Element {
  const auth = useAuth()
  const { getAccessToken } = useAccessToken()
  const [budgetsProbeState, setBudgetsProbeState] = useState<BudgetsProbeState>('idle')
  const [budgetsProbeMessage, setBudgetsProbeMessage] = useState<string>('')
  const [fetchedBudgetCount, setFetchedBudgetCount] = useState<number | null>(null)

  const handleSignOut = (): void => {
    const clientId = import.meta.env.VITE_COGNITO_APP_CLIENT_ID
    const logoutUri = import.meta.env.VITE_LOGOUT_URI
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN

    void auth.removeUser()
    globalThis.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`
  }

  const handleBudgetsProbe = async (): Promise<void> => {
    setBudgetsProbeState('loading')
    setBudgetsProbeMessage('')
    setFetchedBudgetCount(null)

    const accessToken = await getAccessToken()
    if (!accessToken) {
      setBudgetsProbeState('error')
      setBudgetsProbeMessage(
        'アクセストークンを取得できませんでした。再ログイン後に再試行してください。'
      )
      return
    }

    try {
      const response = await getBudgets()
      setBudgetsProbeState('success')
      setFetchedBudgetCount(response.budgets.length)
    } catch (error) {
      console.error('Failed to fetch budgets', error)

      const message = error instanceof Error ? error.message : '不明なエラーが発生しました。'
      setBudgetsProbeState('error')
      setBudgetsProbeMessage(`GET /budgets の呼び出しに失敗しました: ${message}`)
    }
  }

  const userNameClaim = auth.user?.profile['cognito:username']
  const userName = typeof userNameClaim === 'string' ? userNameClaim : 'ユーザー'

  return (
    <section className="max-w-[720px]">
      <h1 className="text-[32px] font-semibold">ようこそ！{userName}さん</h1>
      <p className="mt-[8px] text-[14px] text-primary-text/80">
        この画面から API 疎通確認とログアウトが行えます。
      </p>

      <div className="mt-[24px] flex flex-wrap gap-[12px]">
        <button
          type="button"
          onClick={() => void handleBudgetsProbe()}
          className="rounded-[8px] bg-blue-600 px-[16px] py-[10px] text-[14px] font-medium text-white transition-colors hover:bg-blue-500"
        >
          GET /budgets 疎通確認
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-[8px] bg-red-600 px-[16px] py-[10px] text-[14px] font-medium text-white transition-colors hover:bg-red-500"
        >
          ログアウト
        </button>
      </div>

      {budgetsProbeState === 'loading' ? (
        <p className="mt-[16px] text-[14px]">疎通確認中...</p>
      ) : null}
      {budgetsProbeState === 'success' ? (
        <p className="mt-[16px] text-[14px] text-green-400">
          GET /budgets 成功: {fetchedBudgetCount ?? 0} 件取得
        </p>
      ) : null}
      {budgetsProbeState === 'error' ? (
        <p className="mt-[16px] text-[14px] text-red-400">{budgetsProbeMessage}</p>
      ) : null}
    </section>
  )
}
