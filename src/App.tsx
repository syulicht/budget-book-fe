import { useAuth } from 'react-oidc-context'

import type { CognitoUser } from './types/auth'

import './App.css'

function App() {
  const auth = useAuth()

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
