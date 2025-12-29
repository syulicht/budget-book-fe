# アーキテクチャとデザインパターン

## アプリケーションアーキテクチャ

- **シングルページアプリケーション (SPA)**: React + Vite
- **Feature-Sliced Design**: 機能ごとにモジュール化（features/）
- **認証フロー**: OAuth 2.0 / OIDC (OpenID Connect) with Cognito Hosted UI
- **ルーティング**: TanStack Router（ファイルベースルーティング）
- **状態管理**:
  - サーバー状態: TanStack Query
  - UI 状態: React Hooks (useState, useReducer)
  - 認証状態: react-oidc-context
- **スタイリング**: Tailwind CSS
- **デプロイ**: 静的ホスティング（AWS S3）

## Feature-Sliced Design パターン

### 機能モジュール構成

```
features/
└── [機能名]/
    ├── components/    # 機能固有のコンポーネント
    ├── hooks/         # TanStack Query ラッパーフック
    ├── api/           # API呼び出し + クエリキー定義
    └── types.ts       # 機能固有の型定義
```

### 機能の独立性

- 各機能は独立性を保ち、他機能への依存を最小化
- 共通コンポーネントは `components/ui/` と `components/layouts/` に配置
- 汎用フックは `hooks/` に配置

## 認証パターン

### OIDC 認証フロー（Cognito Hosted UI）

1. **初期化** (`main.tsx`):

   - `AuthProvider`でアプリ全体をラップ
   - Cognito 設定（authority, client_id, redirect_uri 等）を提供

2. **認証ガード** (`features/auth/hooks/useAuthGuard.ts`):

   - 認証が必要なルートで使用
   - 未認証の場合、自動的に Cognito Hosted UI へリダイレクト

3. **コールバック処理** (`routes/callback.tsx`):

   - Cognito Hosted UI からのリダイレクトを処理
   - トークンを取得してアプリケーション内に保存

4. **認証状態管理** (各コンポーネント):
   - `useAuth()`フックで認証状態を取得
   - `isLoading`, `isAuthenticated`, `error`状態を処理
   - `auth.user`でユーザー情報にアクセス

## API 統合パターン

### 1. エンドポイント定義 (`constants/api.ts`)

```typescript
export const API_ENDPOINTS = {
  TRANSACTIONS: "/transactions",
  CATEGORIES: "/categories",
} as const;
```

### 2. API 呼び出し実装 (`features/*/api/`)

```typescript
import { apiClient } from "@/lib/api/client";

export const transactionKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionKeys.all, "list"] as const,
};

export const fetchTransactions = () =>
  apiClient.get("/transactions").then((res) => res.data);
```

### 3. TanStack Query ラッパー (`features/*/hooks/`)

```typescript
import { useQuery } from "@tanstack/react-query";

export const useTransactions = () => {
  return useQuery({
    queryKey: transactionKeys.lists(),
    queryFn: fetchTransactions,
  });
};
```

### 4. コンポーネントでの使用

```typescript
const { data, isLoading, error } = useTransactions();
```

## ルーティングパターン

### TanStack Router

- **ファイルベースルーティング**: `routes/` ディレクトリにルート定義
- **認証ガード**: 認証が必要なルートでは `useAuthGuard()` を呼び出す
- **ルートレイアウト**: `routes/__root.tsx` で全体の認証状態を管理
- **コールバック処理**: `routes/callback.tsx` で Cognito からのリダイレクトを処理

## スタイリングパターン

### Tailwind CSS

- **ユーティリティファースト**: インラインクラスでスタイリング
- **クラス名マージ**: `utils/cn.ts` の `cn()` 関数を使用
- **カスタムユーティリティ**: `index.css` の `@layer` で定義

```typescript
// utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 型システムパターン

### 型の拡張

```typescript
// Cognito固有のクレームを含むようにOIDC型を拡張
export interface CognitoIdTokenClaims extends IdTokenClaims {
  "cognito:username": string;
}

export interface CognitoUser extends Omit<User, "profile"> {
  profile: CognitoIdTokenClaims;
}
```

- ライブラリの型を基に、Cognito 固有の情報を追加
- 型安全性を保ちながらカスタマイズ

## 環境設定パターン

- **Vite 環境変数**: `import.meta.env.VITE_*`でアクセス
- **ビルド時注入**: 環境変数はビルド時に静的に埋め込まれる
- **型安全性**: `vite-env.d.ts`で環境変数の型定義が可能

## コンポーネントパターン

### 条件分岐 UI

```typescript
if (auth.isLoading) return <LoadingUI />;
if (auth.error) return <ErrorUI />;
if (auth.isAuthenticated) return <AuthenticatedUI />;
return <UnauthenticatedUI />;
```

- 早期リターンパターンで認証状態ごとの UI を分離
- 読みやすく、保守しやすい構造

## セキュリティパターン

- **トークン管理**: oidc-client-ts が自動的に管理
- **リダイレクトベース認証**: Cognito ホストされた認証 UI を使用
- **二段階ログアウト**: ローカルと Cognito の両方でセッションクリア
