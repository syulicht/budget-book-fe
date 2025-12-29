# コードスタイルと規約

## TypeScript 設定

- **TypeScript**: 5.9 系を使用（strict mode）
- **設定ファイル**:
  - `tsconfig.json`: プロジェクトルート設定（参照のみ）
  - `tsconfig.app.json`: アプリケーションコード用
  - `tsconfig.node.json`: ビルドツール/設定ファイル用
- **型定義**: `any` の使用は禁止、明示的な型定義を使用

## ESLint 設定

- **設定ファイル**: `eslint.config.js`（Flat Config 形式）
- **ルールセット**:
  - `@eslint/js`: JavaScript 推奨ルール
  - `typescript-eslint`: TypeScript 推奨ルール
  - `eslint-plugin-react-hooks`: React フック関連ルール
  - `eslint-plugin-react-refresh`: Fast Refresh 対応
- **対象ファイル**: `**/*.{ts,tsx}`
- **除外**: `dist/`ディレクトリ
- **ECMAScript**: 2020

## コーディングスタイル

### React

- **コンポーネント**: 関数コンポーネントのみ使用
- **命名**: コンポーネント名は PascalCase
- **ファイル名**: `ComponentName.tsx`

### TypeScript

- **型定義**:
  - `src/types/` にグローバル型定義を配置
  - 機能固有の型は各 `features/*/types.ts` に配置
  - Props の型は interface または type で明示的に定義
- **import 文**:
  - 外部ライブラリが先
  - ローカルモジュールが後
  - 型 import には `type` キーワードを使用 (`import type { ... }`)

### スタイリング

- **Tailwind CSS**: インラインクラスでスタイリング
- **クラス名マージ**: `utils/cn.ts` の `cn()` 関数を使用
- **カスタムユーティリティ**: `index.css` の `@layer` で定義

## ディレクトリ構造規約

### features/ （機能モジュール）

- 機能ごとに独立したモジュールとして配置
- 各機能は `components/`, `hooks/`, `api/` を持つ
- 他機能への依存は最小化

### components/ （共通コンポーネント）

- `ui/`: 基本 UI コンポーネント（Button, Input, Card など）
- `layouts/`: レイアウトコンポーネント（Header, Sidebar など）

### lib/ （ライブラリ設定）

- `api/`: API クライアント設定 + TanStack Query 設定
- `auth/`: 認証設定

## React 規約

- **Strict Mode**: 使用
- **フック使用**:
  - `useAuth`: 認証状態の取得（react-oidc-context）
  - `useQuery`, `useMutation`: データフェッチング（TanStack Query）
  - カスタムフックは `hooks/` または `features/*/hooks/` に配置

## ファイル命名

- **コンポーネント**: PascalCase（`TransactionList.tsx`）
- **ユーティリティ**: camelCase（`formatDate.ts`）
- **型定義ファイル**: camelCase（`auth.ts`, `api.ts`）
- **設定ファイル**: kebab-case または camelCase

## 環境変数

- **アクセス方法**: `import.meta.env.VITE_*`
- **禁止**: `process.env` の使用（Node.js 用）
