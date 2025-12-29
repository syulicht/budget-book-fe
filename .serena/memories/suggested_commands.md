# 推奨コマンド

## 開発コマンド

### 開発サーバー起動
```bash
npm run dev
```
Vite開発サーバーを起動（ホットリロード有効）

### ビルド
```bash
npm run build
```
TypeScriptのコンパイル後、本番用ビルドを実行（`dist/`に出力）

### プレビュー
```bash
npm run preview
```
ビルドされたアプリケーションをローカルでプレビュー

### リント
```bash
npm run lint
```
ESLintでコードをチェック

## デプロイコマンド
```bash
aws s3 sync dist/ s3://mm-app-fe-bucket
```
ビルド済みアプリをS3バケットにデプロイ

## システムコマンド（macOS/Darwin）
- `ls`: ディレクトリ一覧
- `cd`: ディレクトリ移動
- `find`: ファイル検索
- `grep`: テキスト検索
- `git`: バージョン管理

## パッケージ管理
```bash
npm install <package>        # パッケージ追加
npm install --save-dev <pkg> # 開発依存関係追加
npm update                   # パッケージ更新
```
