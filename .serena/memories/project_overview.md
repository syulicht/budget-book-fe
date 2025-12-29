# Budget Book FE - プロジェクト概要

## プロジェクトの目的
AWS Cognitoを使用した認証機能を持つReactフロントエンドアプリケーション。家計簿（Budget Book）アプリケーションのフロントエンド部分。

## テックスタック
- **フレームワーク**: React 19.2.0
- **言語**: TypeScript 5.9.3
- **ビルドツール**: Vite 7.2.4
- **認証**: 
  - oidc-client-ts 3.4.1
  - react-oidc-context 3.3.0 (AWS Cognito統合)
- **開発ツール**:
  - ESLint 9.39.1
  - TypeScript ESLint 8.46.4

## プロジェクト構造
```
budget-book-fe/
├── src/
│   ├── App.tsx           # メインアプリケーションコンポーネント（認証UI）
│   ├── main.tsx          # エントリーポイント（AuthProvider設定）
│   ├── types/
│   │   └── auth.ts       # Cognito関連の型定義
│   ├── assets/           # 静的アセット
│   └── *.css             # スタイルシート
├── public/               # 公開ディレクトリ
└── dist/                 # ビルド出力（S3にデプロイ）

```

## 主要機能
1. **Cognito認証フロー**: OIDC (OpenID Connect) による認証
2. **ログイン/ログアウト**: Cognitoのホストされた認証UIとの統合
3. **ユーザー情報表示**: 認証後のユーザー名表示

## 環境変数
以下の環境変数が必要（.envファイルまたは環境に設定）:
- `VITE_AWS_REGION`: AWSリージョン
- `VITE_COGNITO_USER_POOL_ID`: CognitoユーザープールID
- `VITE_COGNITO_APP_CLIENT_ID`: CognitoアプリクライアントID
- `VITE_REDIRECT_URI`: 認証後のリダイレクトURI
- `VITE_LOGOUT_URI`: ログアウト後のリダイレクトURI
- `VITE_COGNITO_DOMAIN`: Cognitoドメイン

## デプロイ
AWS S3にデプロイ:
```bash
aws s3 sync dist/ s3://mm-app-fe-bucket
```
