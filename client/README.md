# Canvas frontend

Canvas のフロントエンドです。Next.js App Router と React で、思い出のハイライト、アルバム、投稿画面を提供します。

## 必要な環境

- Node.js 20 以上
- npm

## セットアップ

```bash
npm ci
```

API の URL は `API_BASE_URL` で設定します。

```bash
# client/.env.local
API_BASE_URL=http://localhost:9000
```

未設定、または API が失敗した場合は、開発用の fallback データを表示します。

## 開発・検証

```bash
npm run dev
npm run lint
npm run build
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。

## 画面

| パス | 内容 |
| --- | --- |
| `/` | ハイライト、最新投稿、アルバム一覧 |
| `/album/{id}` | 指定 album の投稿一覧 |
| `/auth` | 認証画面 |
| `/upload` | 画像投稿画面（現在は入力 UI のみ） |

## ディレクトリ構成

- `src/app`: ページとレイアウト
- `src/components`: 画面コンポーネント
- `src/lib/api`: バックエンド API 呼び出し
- `src/lib/fallbacks`: API 障害時の表示データ
- `src/types`: API データの TypeScript 型
- `public`: 静的アセット

API の契約や画面の責務については、[設計書](../docs/design.md) と [仕様書](../docs/specification.md) を参照してください。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
