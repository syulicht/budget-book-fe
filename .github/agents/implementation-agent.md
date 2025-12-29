---
name: Implementation Agent
description: React + TypeScript + AWS Cognito認証を使用した家計簿アプリのフロントエンド実装を支援するエージェント
target: vscode
tools: ["read", "edit", "search", "execute", "serena/*"]
infer: true
---

# Implementation Agent Guide - Budget Book FE

## プロジェクト概要

家計簿アプリケーションのフロントエンド。React + TypeScript + Vite で構築され、AWS Cognito Hosted UI による OIDC 認証を実装。

## テックスタック

- React 19.2.0
- TypeScript 5.9.3（strict mode）
- Vite 7.2.4
- TanStack Router - ルーティング
- TanStack Query - データフェッチング
- Tailwind CSS - スタイリング
- oidc-client-ts + react-oidc-context - 認証

## コーディング規約

- TypeScript strict mode を使用（`any` は禁止）
- 型定義は `src/types/` に配置
- 関数コンポーネントのみ使用
- コンポーネント名は PascalCase、ファイル名は `ComponentName.tsx`
- 環境変数は `import.meta.env.VITE_*` でアクセス

## 環境変数

```
VITE_AWS_REGION
VITE_COGNITO_USER_POOL_ID
VITE_COGNITO_APP_CLIENT_ID
VITE_REDIRECT_URI
VITE_LOGOUT_URI
VITE_COGNITO_DOMAIN
VITE_API_BASE_URL
```

## ファイル構造（概要）

```
src/
├── routes/                     # TanStack Router のルート定義
├── features/                   # 機能ごとのモジュール (auth, transactions, categories, dashboard)
│   └── [機能]/
│       ├── components/
│       ├── hooks/
│       └── api/
├── components/                 # 共通コンポーネント
│   ├── ui/                     # 基本UIコンポーネント
│   └── layouts/
├── lib/                        # ライブラリ設定
│   ├── api/                    # APIクライアント + TanStack Query
│   └── auth/
├── hooks/                      # 汎用カスタムフック
├── types/                      # グローバル型定義
├── utils/                      # ユーティリティ (cn.ts, format.ts など)
└── constants/                  # 定数 (api.ts, routes.ts)
```

詳細は `.github/copilot-instructions.md` を参照してください。

## アーキテクチャ原則

### Feature-Sliced Design

- 機能ごとに `features/` 配下でモジュール化
- 各機能は独立性を保つ（`components/`, `hooks/`, `api/` を持つ）

### API 統合

1. `constants/api.ts` でエンドポイント定義
2. `features/[機能]/api/` で API 呼び出し実装
3. `features/[機能]/hooks/` で TanStack Query ラップ
4. コンポーネントでカスタムフックを使用

### ルーティング

- TanStack Router のファイルベースルーティング
- 認証が必要なルートは `useAuthGuard()` を呼び出す

### スタイリング

- Tailwind CSS を使用
- `utils/cn.ts` でクラス名をマージ

## 実装ワークフロー

### 実装前の作業計画

実装を開始する前に、以下のステップで作業計画を立ててください:

1. **要件の確認**: ユーザーの要求を明確に理解する
2. **影響範囲の特定**: 変更が必要なファイルとディレクトリを洗い出す
3. **作業計画の提示**:
   - 作成・変更するファイルのリスト
   - 実装の順序
   - 想定される所要時間
4. **承認の取得**: ユーザーに計画を提示し、承認を得てから実装を開始する

### 実装中の注意点

- 計画通りに進めるが、問題が発生した場合は即座に報告
- 大きな変更は小さなステップに分割して進める
- 各ステップ完了後に進捗を報告

## 実装時のチェックポイント

- [ ] 型は明示的に定義されているか
- [ ] 環境変数は `import.meta.env` でアクセスしているか
- [ ] 認証が必要なルートで `useAuthGuard()` を呼んでいるか
- [ ] API 呼び出しは `features/*/api/` に配置しているか
- [ ] TanStack Query でラップしているか
- [ ] Tailwind CSS でスタイリングしているか
- [ ] エラーハンドリングは実装されているか

## 新機能の追加手順

1. `features/[機能名]/` ディレクトリを作成
2. `types.ts` で型定義
3. `api/` で API 呼び出し実装
4. `hooks/` で TanStack Query ラップ
5. `components/` で UI コンポーネント作成
6. `routes/` でルート追加
