import { useState } from 'react'
import { useAuth } from 'react-oidc-context'

import { useAccessToken } from './features/auth/hooks/useAccessToken'
import { getBudgets } from './features/budgets/api/getBudgets'

import './App.css'

import type { CognitoUser } from './types/auth'

type BudgetsProbeState = 'idle' | 'loading' | 'success' | 'error'

function App() {
  const auth = useAuth()
  const { getAccessToken } = useAccessToken()
  const [budgetsProbeState, setBudgetsProbeState] = useState<BudgetsProbeState>('idle')
  const [budgetsProbeMessage, setBudgetsProbeMessage] = useState<string>('')
  const [fetchedBudgetCount, setFetchedBudgetCount] = useState<number | null>(null)

  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_APP_CLIENT_ID
    const logoutUri = import.meta.env.VITE_LOGOUT_URI
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN

    // ローカルのトークンをクリア
    void auth.removeUser()

    // Cognitoのセッションもクリア
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

  // ローディング中
  if (auth.isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>読み込み中...</h2>
      </div>
    )
  }

  // エラー発生時
  if (auth.error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <h2>エラーが発生しました</h2>
        <p>{auth.error.message}</p>
      </div>
    )
  }

  // 認証済み
  if (auth.isAuthenticated) {
    const user = auth.user as CognitoUser
    const username = user?.profile?.['cognito:username']

    return (
      <div style={{ padding: '20px' }}>
        <h1>ようこそ！{username}さん</h1>
        <button
          onClick={() => void handleBudgetsProbe()}
          style={{
            marginTop: '20px',
            marginRight: '12px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#337ab7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          GET /budgets 疎通確認
        </button>
        {budgetsProbeState === 'loading' ? (
          <p style={{ marginTop: '12px' }}>疎通確認中...</p>
        ) : null}
        {budgetsProbeState === 'success' ? (
          <p style={{ marginTop: '12px', color: '#2b8a3e' }}>
            GET /budgets 成功: {fetchedBudgetCount ?? 0} 件取得
          </p>
        ) : null}
        {budgetsProbeState === 'error' ? (
          <p style={{ marginTop: '12px', color: '#ff4444' }}>{budgetsProbeMessage}</p>
        ) : null}

        <button
          onClick={signOutRedirect}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          ログアウト
        </button>
      </div>
    )
  }

  // 未認証
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={() => void auth.signinRedirect()}
        style={{
          marginTop: '20px',
          padding: '10px 30px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        ログイン
      </button>
    </div>
  )
}

export default App
