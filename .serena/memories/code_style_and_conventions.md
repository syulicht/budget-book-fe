# コードスタイルと規約

## TypeScript設定
- **TypeScript**: 5.9系を使用
- **設定ファイル**:
  - `tsconfig.json`: プロジェクトルート設定（参照のみ）
  - `tsconfig.app.json`: アプリケーションコード用
  - `tsconfig.node.json`: ビルドツール/設定ファイル用

## ESLint設定
- **設定ファイル**: `eslint.config.js`（Flat Config形式）
- **ルールセット**:
  - `@eslint/js`: JavaScript推奨ルール
  - `typescript-eslint`: TypeScript推奨ルール
  - `eslint-plugin-react-hooks`: Reactフック関連ルール
  - `eslint-plugin-react-refresh`: Fast Refresh対応
- **対象ファイル**: `**/*.{ts,tsx}`
- **除外**: `dist/`ディレクトリ
- **ECMAScript**: 2020

## コーディングスタイル
- **関数コンポーネント**: 関数宣言形式を使用 (`function App() {}`)
- **型注釈**: 
  - 明示的な型定義（`type` または `interface`）
  - Cognitoのカスタム型は `types/` ディレクトリに配置
- **import文**:
  - 外部ライブラリが先
  - ローカルモジュールが後
  - 型importには `type` キーワードを使用 (`import type { ... }`)
- **スタイリング**: 
  - CSS Modulesまたは通常のCSS
  - インラインスタイル（`style`）も許容

## React規約
- **Strict Mode**: 使用
- **フック使用**: react-oidc-contextの`useAuth`フックを認証で使用
- **型アサーション**: 必要に応じて型アサーション（`as CognitoUser`）を使用

## ファイル命名
- **コンポーネント**: PascalCase（`App.tsx`）
- **型定義ファイル**: camelCase（`auth.ts`）
- **設定ファイル**: kebab-caseまたはcamelCase
