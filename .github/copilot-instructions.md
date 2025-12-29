# GitHub Copilot Instructions - Budget Book FE

## プロジェクト概要

家計簿アプリケーションのフロントエンド。React + TypeScript + Vite で構築され、AWS Cognito Hosted UI による OIDC 認証を実装しています。

## テックスタック

- **フレームワーク**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **認証**: AWS Cognito Hosted UI (oidc-client-ts, react-oidc-context)
- **ルーティング**: TanStack Router
- **データ取得**: TanStack Query
- **スタイリング**: Tailwind CSS
- **リンター**: ESLint 9.39.1
- **フォーマッター**: Prettier 3.7.4
- **CI/CD**: GitHub Actions

## コード品質

### ESLint

- TypeScript strict mode + type-checked を使用
- `@typescript-eslint/no-explicit-any` でanyを禁止
- React、React Hooks のルールを適用
- import文の自動整理（アルファベット順、グループ分け）
- 設定ファイル: `eslint.config.js`

### Prettier

- シングルクォート使用
- セミコロンなし
- printWidth: 100
- 設定ファイル: `.prettierrc`
- VSCode保存時に自動フォーマット（`.vscode/settings.json`）

### GitHub Actions

- **lint.yml**: mainブランチ以外のpushとすべてのPRでlint/format/型チェック実行
- **deploy.yml**: mainブランチへのpushでlint/format/型チェック + ビルド + デプロイ実行

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
VITE_AWS_REGION
VITE_COGNITO_USER_POOL_ID
VITE_COGNITO_APP_CLIENT_ID
VITE_REDIRECT_URI
VITE_LOGOUT_URI
VITE_COGNITO_DOMAIN
```

### 認証フロー

- `useAuth()` フックを使用してユーザー情報にアクセスする
- ログイン状態は `auth.isAuthenticated` で確認する
- ログイン処理は `auth.signinRedirect()` を使用する
- ログアウト処理は `auth.signoutRedirect()` を使用する

## ファイル構造

```
src/
├── main.tsx                    # エントリーポイント
├── App.tsx                     # ルートコンポーネント
├── index.css                   # Tailwind CSS
├── vite-env.d.ts
│
├── routes/                     # TanStack Router のルート定義
│   ├── __root.tsx              # ルートレイアウト
│   ├── index.tsx               # トップページ
│   ├── callback.tsx            # Cognito コールバック処理
│   ├── dashboard/              # ダッシュボード
│   ├── transactions/           # 取引関連ルート
│   ├── categories/             # カテゴリ管理
│   └── settings/               # 設定
│
├── features/                   # 機能ごとのモジュール
│   ├── auth/                   # 認証機能
│   │   └── hooks/              # useAuthGuard など
│   ├── transactions/           # 取引機能
│   │   ├── components/         # TransactionList, TransactionForm など
│   │   ├── hooks/              # useTransactions など
│   │   └── api/                # 取引API呼び出し
│   ├── categories/             # カテゴリ機能
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   └── dashboard/              # ダッシュボード機能
│       ├── components/
│       └── hooks/
│
├── components/                 # 共通コンポーネント
│   ├── ui/                     # Tailwind ベースの基本UIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── layouts/                # レイアウトコンポーネント
│       ├── AuthLayout.tsx
│       └── Header.tsx
│
├── lib/                        # ライブラリ設定・ラッパー
│   ├── api/                    # API クライアント設定
│   │   ├── client.ts           # Axios + 認証トークン設定
│   │   └── queryClient.ts      # TanStack Query の設定
│   ├── auth/                   # 認証設定
│   │   └── config.ts           # Cognito 設定
│   └── router.ts               # TanStack Router の設定
│
├── hooks/                      # 汎用カスタムフック
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── types/                      # グローバル型定義
│   ├── auth.ts                 # 認証関連
│   ├── api.ts                  # API レスポンス型
│   └── index.ts
│
├── utils/                      # ユーティリティ関数
│   ├── format.ts               # 日付・金額フォーマット
│   ├── validation.ts           # バリデーション
│   └── cn.ts                   # Tailwind clsx helper
│
├── constants/                  # 定数
│   ├── api.ts                  # API エンドポイント
│   ├── routes.ts               # ルートパス定義
│   └── config.ts
│
└── assets/                     # 静的ファイル
    ├── images/
    └── icons/
```

## ベストプラクティス

### アーキテクチャ

- **Feature-Sliced Design**: 機能ごとにモジュールを分割（features/）
- 各機能モジュールは独立性を保ち、他機能への依存を最小化
- 共通コンポーネントは components/ に配置

### コンポーネント設計

- 単一責任の原則を守る
- 再利用可能なコンポーネントは components/ui/ に配置
- Props の型は interface または type で明示的に定義する
- Tailwind CSS でスタイリング（インラインクラス使用）

### ルーティング

- TanStack Router のファイルベースルーティングを使用
- 各ルートは routes/ ディレクトリに配置
- 認証が必要なルートでは `useAuthGuard()` を呼び出す

### データ取得

- TanStack Query を使用
- クエリキーは機能ごとに定義（例: `transactionKeys`）
- API 呼び出しは features/\*/api/ に配置
- カスタムフックで TanStack Query をラップ（例: `useTransactions()`）

### 状態管理

- サーバー状態: TanStack Query
- UI 状態: React Hooks (useState, useReducer)
- グローバル状態: Context API（必要に応じて）

### スタイリング

- Tailwind CSS を使用
- カスタムユーティリティは index.css の @layer で定義
- clsx + tailwind-merge を使った cn() 関数でクラス名を結合

### エラーハンドリング

- 認証エラーは適切にキャッチして処理する
- TanStack Query のエラーハンドリング機能を活用
- ユーザーにわかりやすいエラーメッセージを表示する
- console.error を使用してデバッグ情報を出力する

### API 統合

- Axios を使用してバックエンド API と通信
- lib/api/client.ts でリクエストインターセプターを設定
- 認証トークンを自動的にヘッダーに付与
- エンドポイントは constants/api.ts で一元管理

### パフォーマンス

- 不要な再レンダリングを避ける
- 必要に応じて `useMemo` や `useCallback` を使用する
- TanStack Router の Lazy loading を活用
- 画像の最適化（WebP, lazy loading）

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
- コンポーネントファイルは PascalCase（例: `TransactionList.tsx`）
- ユーティリティファイルは camelCase（例: `formatDate.ts`）
- 機能を実装する際は対応する features/ 配下に配置する
- API 呼び出しは必ず features/\*/api/ に配置し、カスタムフックでラップする

## 開発ワークフロー

### 新機能の追加手順

1. `features/[機能名]/` ディレクトリを作成
2. `types.ts` で型定義を作成
3. `api/` で API 呼び出しを実装
4. `hooks/` でカスタムフックを作成（TanStack Query でラップ）
5. `components/` で UI コンポーネントを作成
6. `routes/` でルートを追加

### API 統合の手順

1. `constants/api.ts` にエンドポイントを定義
2. `features/[機能名]/api/` に API 関数を実装
3. `features/[機能名]/hooks/` でカスタムフックを作成
4. コンポーネントでカスタムフックを使用
