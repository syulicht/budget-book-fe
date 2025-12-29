---
name: Implementation Agent
description: React + TypeScript + AWS Cognito認証を使用した家計簿アプリのフロントエンド実装を支援するエージェント
target: vscode
tools: ['read', 'edit', 'search', 'execute', 'serena/*']
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

### タスク完了前の必須チェック

**タスク完了報告前に、以下を必ず実行して確認すること:**

```bash
npm run lint          # ESLintエラーがないこと
npm run format:check  # フォーマットが正しいこと
npm run type-check    # 型エラーがないこと
```

- すべてのチェックが通ることを確認してから完了報告
- エラーがある場合は修正してから報告
- CI/CDで失敗しないことを事前に保証

## 実装時のチェックポイント

- [ ] 型は明示的に定義されているか
- [ ] 環境変数は `import.meta.env` でアクセスしているか
- [ ] 認証が必要なルートで `useAuthGuard()` を呼んでいるか
- [ ] API 呼び出しは `features/*/api/` に配置しているか
- [ ] TanStack Query でラップしているか
- [ ] Tailwind CSS でスタイリングしているか
- [ ] エラーハンドリングは実装されているか
- [ ] **lint、format、型チェックがすべて通るか**

## 新機能の追加手順

1. `features/[機能名]/` ディレクトリを作成
2. `types.ts` で型定義
3. `api/` で API 呼び出し実装
4. `hooks/` で TanStack Query ラップ
5. `components/` で UI コンポーネント作成
6. `routes/` でルート追加

## ドキュメント管理

**重要: タスク完了前に必ずドキュメントを更新すること。ドキュメント更新はタスクの一部です。**

プロジェクトの構造や設計に関する変更を行った場合は、**必ず**関連するドキュメントを更新してください。ユーザーから指示がなくても、以下のトリガーに該当する場合は自発的に更新すること。

### 作業計画時の必須事項

**作業計画を立てる際は、必ずドキュメント更新の必要性を検討し、計画に含めること**

- タスクがツール追加、アーキテクチャ変更、規約変更などに該当するか判断
- 該当する場合、作業計画の中に「ドキュメント更新」の項目を明示
- どのドキュメントを更新するかを具体的に記載
- ユーザーへの作業計画共有時に、ドキュメント更新の必要性も説明

### 必須更新のトリガー（自発的に更新すること）

以下の変更を行った場合、**タスク完了前に必ずドキュメントを更新**：

1. **ツールの追加・変更**
   - ESLint、Prettier、テストフレームワークなどの導入・設定変更
   - 新しいライブラリやフレームワークの追加
   - ビルドツールやCI/CD設定の変更

2. **アーキテクチャ変更**
   - ディレクトリ構造の変更
   - 状態管理方法の変更
   - API通信方法の変更

3. **コーディング規約の変更**
   - import順序ルールの追加・変更
   - 命名規則の変更
   - 新しいベストプラクティスの導入

4. **開発ワークフロー変更**
   - 新しいnpmスクリプトの追加
   - 環境変数の追加・変更
   - デプロイ手順の変更

### ドキュメント更新の原則

- **一貫性の維持**: コードとドキュメントの内容を一致させる
- **即時更新**: 変更と同時にドキュメントも更新する
- **複数箇所の確認**: 変更が影響する全てのドキュメントを更新する
- **完了報告**: 更新したドキュメントを明示的にユーザーに伝える

### 更新すべき主なドキュメント

1. **`.github/copilot-instructions.md`** - このファイル
   - テックスタック
   - コード品質ツール
   - コーディング規約
   - 開発ワークフロー

2. **`README.md`** - プロジェクト概要
   - Tech Stack
   - コマンド一覧
   - セットアップ手順

3. **`.github/agents/`** - エージェント用ガイド（存在する場合）

4. **`.serena/memories/`** - Serena MCP のメモリ（存在する場合）

### ドキュメント更新の実施例

例: ESLintとPrettierを導入した場合

- ✅ `.github/copilot-instructions.md`に「コード品質」セクションを追加
- ✅ `README.md`に新しいコマンドとツール説明を追加
- ✅ ユーザーに更新内容を報告
