# GitHub Copilot Instructions - Budget Book FE

## プロジェクト概要

家計簿アプリケーションのフロントエンド。React + TypeScript + Vite で構築され、AWS Cognito による OIDC 認証を実装しています。

## テックスタック

- **フレームワーク**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **認証**: oidc-client-ts, react-oidc-context
- **リンター**: ESLint 9.39.1

## コーディング規約

### TypeScript

- 常に型定義を明示する
- `any` の使用は避け、適切な型を定義する
- 型定義は `src/types/` ディレクトリに配置する
- strict モードを使用する

### React

- 関数コンポーネントを使用する（クラスコンポーネントは使用しない）
- React Hooks を活用する（useState, useEffect, useContext など）
- コンポーネント名は PascalCase で記述する
- ファイル名は `ComponentName.tsx` の形式で記述する

### スタイリング

- CSS ファイルは対応するコンポーネントと同じディレクトリに配置する
- グローバルスタイルは `index.css` に記述する

## 認証関連

### AWS Cognito 統合

- `react-oidc-context` の `AuthProvider` を使用する
- 認証設定は `main.tsx` で構成する
- 環境変数から認証情報を取得する（`import.meta.env` を使用）

### 必要な環境変数

```typescript
VITE_AWS_REGION;
VITE_COGNITO_USER_POOL_ID;
VITE_COGNITO_APP_CLIENT_ID;
VITE_REDIRECT_URI;
VITE_LOGOUT_URI;
VITE_COGNITO_DOMAIN;
```

### 認証フロー

- `useAuth()` フックを使用してユーザー情報にアクセスする
- ログイン状態は `auth.isAuthenticated` で確認する
- ログイン処理は `auth.signinRedirect()` を使用する
- ログアウト処理は `auth.signoutRedirect()` を使用する

## ファイル構造

```
src/
├── App.tsx           # メインアプリケーションコンポーネント
├── main.tsx          # エントリーポイント
├── types/            # 型定義
│   └── auth.ts       # 認証関連の型
├── assets/           # 画像などの静的ファイル
└── *.css             # スタイルシート
```

## ベストプラクティス

### コンポーネント設計

- 単一責任の原則を守る
- 再利用可能なコンポーネントは共通ディレクトリに配置する
- Props の型は interface または type で明示的に定義する

### エラーハンドリング

- 認証エラーは適切にキャッチして処理する
- ユーザーにわかりやすいエラーメッセージを表示する
- console.error を使用してデバッグ情報を出力する

### パフォーマンス

- 不要な再レンダリングを避ける
- 必要に応じて `useMemo` や `useCallback` を使用する
- Lazy loading を検討する

## コマンド

### 開発

```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run lint         # ESLint チェック
npm run preview      # ビルド結果のプレビュー
```

### デプロイ

```bash
npm run build
aws s3 sync dist/ s3://mm-app-fe-bucket
```

## コード生成時の注意点

- 環境変数は `import.meta.env.VITE_*` でアクセスする（`process.env` は使用しない）
- 新しい依存関係を追加する際は、必要性を検討する
- セキュリティに配慮し、認証トークンやシークレットをコードに直接記述しない
- AWS リソースへのアクセスは認証済みユーザーのみに制限する
