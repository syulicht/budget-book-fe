---
name: Implementation Agent
description: React + TypeScript + AWS Cognito認証を使用した家計簿アプリのフロントエンド実装を支援するエージェント
target: vscode
tools: ["read", "edit", "search", "execute", "serena/*"]
infer: true
---

# Implementation Agent Guide - Budget Book FE

## プロジェクト概要

家計簿アプリケーションのフロントエンド。React + TypeScript + Vite で構築され、AWS Cognito による OIDC 認証を実装。

## テックスタック

- React 19.2.0
- TypeScript 5.9.3（strict mode）
- Vite 7.2.4
- oidc-client-ts + react-oidc-context

## コーディング規約

### TypeScript

- 型定義を明示する（`any` は禁止）
- 型定義は `src/types/` に配置
- strict mode を使用

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
}

// ❌ Bad - any の使用
const User = ({ name, email }: any) => {};
```

### React

- 関数コンポーネントのみ使用
- Hooks を活用（useState, useEffect, useContext など）
- コンポーネント名は PascalCase
- ファイル名は `ComponentName.tsx`

```typescript
// ✅ Good
const UserProfile: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  // ...
};
```

## 認証実装

### 基本構成（main.tsx）

```typescript
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
  client_id: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  response_type: "code",
  scope: "openid email",
};

<AuthProvider {...cognitoAuthConfig}>
  <App />
</AuthProvider>;
```

### 認証状態の使用

```typescript
import { useAuth } from "react-oidc-context";

const MyComponent: React.FC = () => {
  const auth = useAuth();

  if (auth.isLoading) return <Loading />;
  if (auth.error) return <Error message={auth.error.message} />;
  if (!auth.isAuthenticated) {
    return <button onClick={() => auth.signinRedirect()}>ログイン</button>;
  }

  const user = auth.user as CognitoUser;
  return <div>Welcome, {user.profile["cognito:username"]}</div>;
};
```

### ログアウト

```typescript
const handleLogout = () => {
  auth.removeUser();
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutUri
  )}`;
};
```

## 環境変数

### 必須変数

```
VITE_AWS_REGION
VITE_COGNITO_USER_POOL_ID
VITE_COGNITO_APP_CLIENT_ID
VITE_REDIRECT_URI
VITE_LOGOUT_URI
VITE_COGNITO_DOMAIN
```

### アクセス方法

```typescript
// ✅ Vite の方法
const region = import.meta.env.VITE_AWS_REGION;

// ❌ Node.js の方法（使用禁止）
const region = process.env.VITE_AWS_REGION;
```

## ファイル構造

```
src/
├── App.tsx           # メインコンポーネント
├── main.tsx          # エントリーポイント
├── types/            # 型定義
│   └── auth.ts
├── assets/           # 静的ファイル
└── *.css             # スタイル
```

## 実装時のチェックポイント

- [ ] 型は明示的に定義されているか
- [ ] 環境変数は `import.meta.env` でアクセスしているか
- [ ] 認証が必要な箇所で認証チェックがあるか
- [ ] エラーハンドリングは実装されているか
- [ ] コンソールエラーが出ていないか
