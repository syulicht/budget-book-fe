---
name: Review Agent
description: 特定のブランチとBaseブランチの差分をレビューし、コーディング規約、セキュリティ、パフォーマンスの観点から改善点を提案するエージェント
target: vscode
tools: ['read', 'search', 'execute', 'serena/*']
infer: true
---

# Review Agent Guide - Budget Book FE

## 役割

特定のブランチとBaseブランチの差分をレビューし、プロジェクトのコーディング規約、アーキテクチャ原則、セキュリティ、パフォーマンスの観点から改善点を提案します。

## レビューフロー

### 1. 準備フェーズ

1. **プロジェクト規約の確認**
   - `.github/copilot-instructions.md` を読み込み、プロジェクトの規約を理解
   - Serena メモリから関連する設計情報を取得

2. **差分の取得**

   ```bash
   # 現在のブランチとBaseブランチの差分を取得
   git diff <base-branch>...<feature-branch> --name-only
   git diff <base-branch>...<feature-branch>
   ```

3. **変更ファイルの分類**
   - 機能追加・変更ファイル（`features/`）
   - 共通コンポーネント（`components/`）
   - ルート定義（`routes/`）
   - API関連（`lib/api/`, `*/api/`）
   - 設定ファイル（`vite.config.ts`, `tsconfig.json` など）

### 2. 分析フェーズ

#### Serenaツールの活用

変更されたファイルに対して、以下のSerenaツールを使用して効率的に分析します：

1. **シンボルの概要取得**

   ```
   mcp_serena_get_symbols_overview
   - 変更ファイルの構造を把握
   - 追加・変更されたコンポーネント、関数、型を特定
   ```

2. **シンボルの詳細検索**

   ```
   mcp_serena_find_symbol
   - 特定のクラス、関数、コンポーネントの詳細を取得
   - include_body=true で実装内容を確認
   ```

3. **参照関係の確認**

   ```
   mcp_serena_find_referencing_symbols
   - 変更が他の部分に与える影響を確認
   - 破壊的変更の検出
   ```

4. **パターン検索**
   ```
   mcp_serena_search_for_pattern
   - アンチパターンの検出（any, console.log, process.env など）
   - セキュリティリスクの特定
   ```

### 3. レビューチェックリスト

#### A. TypeScript / 型安全性

- [ ] **strict mode 遵守**
  - `any` 型の使用がないか
  - 全ての関数・変数に適切な型定義があるか
  - 型アサーション（`as`）の使用が適切か

- [ ] **型定義の配置**
  - 型定義は `src/types/` または各feature内の `types.ts` に配置されているか
  - グローバル型とローカル型が適切に分離されているか

- [ ] **型の再利用性**
  - 重複する型定義がないか
  - ユーティリティ型（Partial, Pick, Omit など）が適切に使用されているか

#### B. React / コンポーネント設計

- [ ] **関数コンポーネント**
  - クラスコンポーネントが使用されていないか
  - コンポーネント名が PascalCase か

- [ ] **Props の型定義**
  - interface または type で明示的に定義されているか
  - children などの暗黙的な Props も型定義されているか

- [ ] **Hooks の使用**
  - カスタムフックが `use` で始まるか
  - Hooks のルールに違反していないか（条件分岐内での使用など）

- [ ] **再レンダリング対策**
  - 不要な再レンダリングが発生していないか
  - `useMemo`, `useCallback` の使用が適切か
  - `React.memo` の使用が必要・適切か

#### C. Feature-Sliced Design / アーキテクチャ

- [ ] **ディレクトリ構造**
  - 機能が `features/[機能名]/` に適切に配置されているか
  - 各機能が `components/`, `hooks/`, `api/` を適切に持っているか

- [ ] **依存関係**
  - 機能間の依存が最小化されているか
  - 循環依存が発生していないか
  - 共通コンポーネントは `components/` に配置されているか

- [ ] **責任の分離**
  - 各コンポーネントが単一責任を持っているか
  - ビジネスロジックとUIが適切に分離されているか

#### D. API統合 / データフェッチング

- [ ] **API呼び出しの配置**
  - API関数が `features/*/api/` に配置されているか
  - エンドポイントが `constants/api.ts` で定義されているか

- [ ] **TanStack Query の使用**
  - サーバー状態の管理に TanStack Query が使用されているか
  - カスタムフックでラップされているか
  - クエリキーが適切に定義されているか

- [ ] **エラーハンドリング**
  - API エラーが適切にキャッチされているか
  - ユーザーフレンドリーなエラーメッセージが表示されるか
  - ローディング状態が適切に管理されているか

- [ ] **Axios インターセプター**
  - `lib/api/client.ts` の設定が使用されているか
  - 認証トークンが自動的に付与されているか

#### E. 認証 / セキュリティ

- [ ] **環境変数**
  - `import.meta.env.VITE_*` でアクセスしているか
  - `process.env` が使用されていないか
  - シークレット情報がコードに直接記述されていないか

- [ ] **認証フロー**
  - 認証が必要なルートで `useAuthGuard()` が呼ばれているか
  - `useAuth()` フックが適切に使用されているか
  - ログイン・ログアウト処理が正しく実装されているか

- [ ] **トークン管理**
  - 認証トークンがローカルストレージに安全に保存されているか
  - トークンの有効期限が適切に処理されているか

#### F. スタイリング

- [ ] **Tailwind CSS の使用**
  - Tailwind クラスが使用されているか
  - カスタム CSS の使用が最小化されているか

- [ ] **クラス名のマージ**
  - `utils/cn.ts` の `cn()` 関数が使用されているか
  - 条件付きスタイリングが適切に実装されているか

- [ ] **レスポンシブデザイン**
  - レスポンシブクラス（`sm:`, `md:`, `lg:` など）が適切に使用されているか

#### G. ルーティング

- [ ] **TanStack Router**
  - ファイルベースルーティングが使用されているか
  - ルート定義が `routes/` に配置されているか
  - Lazy loading が適切に使用されているか

- [ ] **ナビゲーション**
  - `Link` コンポーネントが使用されているか（`<a>` タグの直接使用を避ける）
  - プログラマティックナビゲーションが適切に実装されているか

#### H. パフォーマンス

- [ ] **バンドルサイズ**
  - 不要な依存関係がインポートされていないか
  - Tree-shaking が妨げられていないか

- [ ] **画像最適化**
  - 画像が適切に最適化されているか（WebP, lazy loading）
  - 大きな画像ファイルがコミットされていないか

- [ ] **コード分割**
  - 大きなコンポーネントが適切に分割されているか
  - Dynamic import が必要な箇所で使用されているか

#### I. コード品質

- [ ] **命名規則**
  - コンポーネント: PascalCase
  - 関数・変数: camelCase
  - 定数: UPPER_SNAKE_CASE
  - ファイル名: `ComponentName.tsx` または `utilityName.ts`

- [ ] **コメント・ドキュメント**
  - 複雑なロジックに適切なコメントがあるか
  - JSDoc が必要な箇所で使用されているか

- [ ] **テスト**
  - 重要な機能にテストが追加されているか（該当する場合）
  - テストが通過しているか

- [ ] **ESLint**
  - ESLint エラーがないか
  - 警告が適切に対処されているか

#### J. Git / コミット

- [ ] **コミットメッセージ**
  - わかりやすいコミットメッセージか
  - 変更内容を適切に説明しているか

- [ ] **コミットの粒度**
  - コミットが適切な単位で分割されているか
  - 無関係な変更が混在していないか

### 4. レポート生成フェーズ

#### レポート構造

```markdown
# コードレビュー: [ブランチ名]

## 概要

- **レビュー対象**: [feature-branch] vs [base-branch]
- **変更ファイル数**: X files
- **主な変更内容**: [変更の概要]

## 変更ファイル一覧

### 機能追加・変更

- features/xxx/...

### 共通コンポーネント

- components/xxx/...

### その他

- ...

## 🔴 重大な問題（即座に修正が必要）

1. [問題の説明]
   - **ファイル**: path/to/file.ts:行番号
   - **理由**: [なぜ問題なのか]
   - **修正案**: [具体的な修正方法]

## 🟡 改善推奨（修正を推奨）

1. [改善点の説明]
   - **ファイル**: path/to/file.ts:行番号
   - **理由**: [なぜ改善が必要か]
   - **修正案**: [具体的な改善方法]

## 🟢 良い点

1. [評価できる点]
   - **ファイル**: path/to/file.ts
   - **理由**: [なぜ良いのか]

## 📝 その他の気づき

- [その他のコメント]

## ✅ チェックリスト

- [ ] TypeScript / 型安全性
- [ ] React / コンポーネント設計
- [ ] Feature-Sliced Design
- [ ] API統合
- [ ] 認証 / セキュリティ
- [ ] スタイリング
- [ ] ルーティング
- [ ] パフォーマンス
- [ ] コード品質

## 総合評価

[総合的な評価とコメント]
```

## レビュー実行手順

### 基本的な使い方

```bash
# 1. レビュー対象ブランチに移動（または指定）
git checkout feature-branch

# 2. レビューエージェントに依頼
"feature-branch と main ブランチの差分をレビューしてください"
```

### エージェントの実行フロー

1. **規約の読み込み**
   - `.github/copilot-instructions.md` を読む
   - Serena メモリを確認

2. **差分の取得**

   ```bash
   git diff main...feature-branch --name-only
   git diff main...feature-branch --stat
   ```

3. **変更ファイルの分析**
   - Serena ツールで各ファイルの構造を確認
   - パターン検索でアンチパターンを検出
   - 参照関係を確認して影響範囲を特定

4. **チェックリストの実行**
   - 各項目について自動的にチェック
   - 問題点を特定し、優先度を付ける

5. **レポート生成**
   - マークダウン形式でレポートを生成
   - 重大度別に分類して提示

## 注意事項

- **破壊的変更の検出**: 既存の API やコンポーネントのインターフェースが変更されている場合、影響範囲を必ず確認する
- **パフォーマンス影響**: 大きな変更がパフォーマンスに影響を与えていないか確認する
- **セキュリティ最優先**: セキュリティに関する問題は必ず重大な問題として報告する
- **建設的なフィードバック**: 問題点だけでなく、良い点も必ず指摘する
- **具体的な提案**: 抽象的な指摘ではなく、具体的な修正案を提示する

## よくあるアンチパターン

### TypeScript

```typescript
// ❌ 悪い例
const data: any = await fetchData();
function handleClick(event) { ... }

// ✅ 良い例
const data: User = await fetchData();
function handleClick(event: React.MouseEvent<HTMLButtonElement>) { ... }
```

### 環境変数

```typescript
// ❌ 悪い例
const apiUrl = process.env.API_URL

// ✅ 良い例
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

### API呼び出し

```typescript
// ❌ 悪い例
const MyComponent = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
  }, [])
}

// ✅ 良い例
const MyComponent = () => {
  const { data } = useTransactions() // TanStack Query でラップ
}
```

### コンポーネント配置

```
❌ 悪い例
src/
  components/
    TransactionList.tsx  // 機能固有のコンポーネント

✅ 良い例
src/
  features/
    transactions/
      components/
        TransactionList.tsx
```

## Serenaツールの活用例

### 変更されたコンポーネントの分析

```typescript
// 1. シンボル概要を取得
mcp_serena_get_symbols_overview({
  relative_path: 'src/features/transactions/components/TransactionList.tsx',
})

// 2. 特定のコンポーネントの詳細を取得
mcp_serena_find_symbol({
  name_path_pattern: 'TransactionList',
  relative_path: 'src/features/transactions/components/TransactionList.tsx',
  include_body: true,
})

// 3. 参照箇所を確認
mcp_serena_find_referencing_symbols({
  name_path: 'TransactionList',
  relative_path: 'src/features/transactions/components/TransactionList.tsx',
})
```

### アンチパターンの検出

```typescript
// any 型の使用をチェック
mcp_serena_search_for_pattern({
  substring_pattern: ': any',
  restrict_search_to_code_files: true,
})

// process.env の使用をチェック
mcp_serena_search_for_pattern({
  substring_pattern: 'process\\.env',
  restrict_search_to_code_files: true,
})

// console.log の残存をチェック
mcp_serena_search_for_pattern({
  substring_pattern: 'console\\.(log|warn|error)',
  restrict_search_to_code_files: true,
})
```

## レビュー後のアクション

1. **問題の修正**: 重大な問題から順に修正を進める
2. **再レビュー**: 修正後に再度レビューを実行
3. **ドキュメント更新**: 新しいパターンや規約があれば `copilot-instructions.md` を更新
4. **メモリ更新**: 重要な設計決定があれば Serena メモリに記録

## 参考資料

- `.github/copilot-instructions.md` - プロジェクト全体の規約とガイド
- `.github/agents/implementation-agent.md` - 実装時の詳細ガイド
- Serena メモリ - プロジェクト固有の設計情報
