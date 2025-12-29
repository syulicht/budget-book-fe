# Budget Book FE - プロジェクト概要

## プロジェクトの目的

AWS Cognito Hosted UI を使用した認証機能を持つ React フロントエンドアプリケーション。家計簿（Budget Book）アプリケーションのフロントエンド部分。

## テックスタック

- **フレームワーク**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **ルーティング**: TanStack Router
- **データフェッチング**: TanStack Query
- **スタイリング**: Tailwind CSS
- **認証**:
  - oidc-client-ts 3.4.1
  - react-oidc-context 3.3.0 (AWS Cognito Hosted UI)
- **開発ツール**:
  - ESLint 9.39.1
  - TypeScript ESLint 8.46.4

## プロジェクト構造

```
budget-book-fe/
├── src/
│   ├── main.tsx                # エントリーポイント（AuthProvider設定）
│   ├── App.tsx                 # ルートコンポーネント
│   ├── index.css               # Tailwind CSS
│   ├── routes/                 # TanStack Router ルート定義
│   ├── features/               # 機能ごとのモジュール
│   │   ├── auth/               # 認証機能
│   │   ├── transactions/       # 取引機能
│   │   ├── categories/         # カテゴリ機能
│   │   └── dashboard/          # ダッシュボード機能
│   ├── components/             # 共通コンポーネント
│   │   ├── ui/                 # 基本UIコンポーネント
│   │   └── layouts/            # レイアウトコンポーネント
│   ├── lib/                    # ライブラリ設定
│   │   ├── api/                # APIクライアント + TanStack Query
│   │   └── auth/               # 認証設定
│   ├── hooks/                  # 汎用カスタムフック
│   ├── types/                  # グローバル型定義
│   ├── utils/                  # ユーティリティ
│   ├── constants/              # 定数
│   └── assets/                 # 静的アセット
├── public/                     # 公開ディレクトリ
└── dist/                       # ビルド出力（S3にデプロイ）
```

## 主要機能

1. **Cognito Hosted UI 認証**: OIDC (OpenID Connect) による認証
2. **ルーティング**: TanStack Router によるファイルベースルーティング
3. **データフェッチング**: TanStack Query による効率的なデータ管理
4. **取引管理**: 収入・支出の記録と管理
5. **カテゴリ管理**: 取引カテゴリの設定
6. **ダッシュボード**: 家計簿の概要表示

## 環境変数

以下の環境変数が必要（.env ファイルまたは環境に設定）:

- `VITE_AWS_REGION`: AWS リージョン
- `VITE_COGNITO_USER_POOL_ID`: Cognito ユーザープール ID
- `VITE_COGNITO_APP_CLIENT_ID`: Cognito アプリクライアント ID
- `VITE_REDIRECT_URI`: 認証後のリダイレクト URI
- `VITE_LOGOUT_URI`: ログアウト後のリダイレクト URI
- `VITE_COGNITO_DOMAIN`: Cognito ドメイン
- `VITE_API_BASE_URL`: バックエンド API のベース URL

## デプロイ

AWS S3 にデプロイ:

```bash
npm run build
aws s3 sync dist/ s3://mm-app-fe-bucket
```
