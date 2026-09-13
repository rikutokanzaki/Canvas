# Canvas

Canvas は、写真と短いメモを album として共有する Web アプリケーションです。

## 構成

- `client`: Next.js / React のフロントエンド
- `server`: Rust workspace
- `server/fetch-albums`: album 内容を返す AWS Lambda
- `docs`: システム設計書と機能仕様書

<br>
<div align="center">
<img alt="system_architecture" src="/docs/img/architecture.svg">
</div>
<br>

## 開発環境

フロントエンド:

```bash
cd client
npm ci
npm run dev
```

バックエンド:

```bash
cd server
cargo check
cargo test
```

DB 接続を含むローカル Lambda の実行には、[server/fetch-albums/README.md](server/fetch-albums/README.md) の環境変数と Cargo Lambda の設定が必要です。

## 品質確認

```bash
cd client && npm run lint && npm run build
cd ../server && cargo fmt --all -- --check
cargo clippy --locked --all-targets --all-features -- -D warnings
cargo test --locked --all-targets --all-features
```

GitHub Actions では Rust の format、clippy、check、test、cargo audit を実行し、`main` への push 時に Lambda をビルド・デプロイします。

## ドキュメント

- [設計書](docs/design.md)
- [仕様書](docs/specification.md)
- [フロントエンド README](client/README.md)
- [バックエンド README](server/fetch-albums/README.md)
