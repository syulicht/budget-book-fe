# アーキテクチャとデザインパターン

## アプリケーションアーキテクチャ
- **シングルページアプリケーション (SPA)**: React + Vite
- **認証フロー**: OAuth 2.0 / OIDC (OpenID Connect)
- **状態管理**: react-oidc-context（認証状態）
- **デプロイ**: 静的ホスティング（AWS S3）

## 認証パターン
### OIDC認証フロー
1. **初期化** (`main.tsx`):
   - `AuthProvider`でアプリ全体をラップ
   - Cognito設定（authority, client_id, redirect_uri等）を提供

2. **認証状態管理** (`App.tsx`):
   - `useAuth()`フックで認証状態を取得
   - `isLoading`, `isAuthenticated`, `error`状態を処理
   - `auth.user`でユーザー情報にアクセス

3. **ログアウト**:
   - ローカルトークンクリア: `auth.removeUser()`
   - Cognitoセッションクリア: Cognitoログアウトエンドポイントへリダイレクト

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
- ライブラリの型を基に、Cognito固有の情報を追加
- 型安全性を保ちながらカスタマイズ

## 環境設定パターン
- **Vite環境変数**: `import.meta.env.VITE_*`でアクセス
- **ビルド時注入**: 環境変数はビルド時に静的に埋め込まれる
- **型安全性**: `vite-env.d.ts`で環境変数の型定義が可能

## コンポーネントパターン
### 条件分岐UI
```typescript
if (auth.isLoading) return <LoadingUI />;
if (auth.error) return <ErrorUI />;
if (auth.isAuthenticated) return <AuthenticatedUI />;
return <UnauthenticatedUI />;
```
- 早期リターンパターンで認証状態ごとのUIを分離
- 読みやすく、保守しやすい構造

## セキュリティパターン
- **トークン管理**: oidc-client-tsが自動的に管理
- **リダイレクトベース認証**: Cognitoホストされた認証UIを使用
- **二段階ログアウト**: ローカルとCognitoの両方でセッションクリア
