# Canvas 仕様書

## 1. 対象範囲

本仕様書は、現在実装されている album 閲覧機能と、フロントエンドの主要画面・データ形式を定義する。認証、画像アップロード、album 一覧取得は UI のみ、または API 未実装のため本番仕様には含めない。

## 2. 画面仕様

| 画面 | URL | 内容 |
| --- | --- | --- |
| ホーム | `/` | highlight、最新投稿、album 一覧を表示 |
| album 詳細 | `/album/{id}` | 指定 album の post を表示 |
| 認証 | `/auth` | 認証フォームを表示 |
| upload | `/upload` | 画像選択と説明入力の UI を表示 |

API が利用できない場合、ホームと album 詳細は fallback データを表示する。

## 3. API 仕様

### 3.1 album 詳細取得

```http
GET /albums/{id}
```

#### パスパラメータ

| 名前 | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `id` | string | yes | album の識別子 |

#### 200 response

```json
{
  "id": "album-id",
  "title": "日常",
  "posts": [
    {
      "id": "post-id",
      "imagePath": "https://example.com/image.jpg",
      "description": "memory",
      "date": "2025-09-09"
    }
  ]
}
```

#### エラー response

| status | 条件 | body |
| --- | --- | --- |
| `400` | `id` が渡されない | `{"error":"album id is required"}` |
| `404` | 指定 album が存在しない | `{"error":"album not found"}` |
| `500` | DB 接続・SQL・認証などの内部エラー | Lambda runtime のエラー応答 |

## 4. データ形式

### AlbumContent

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `id` | string | album ID |
| `title` | string | album のタイトル |
| `posts` | MemoryPostData[] | album に含まれる投稿 |

### MemoryPostData

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `id` | string | post ID |
| `imagePath` | string | 画像 URL またはパス |
| `description` | string | 投稿説明 |
| `date` | string | 投稿日時・日付の表示文字列 |

## 5. DB 仕様

必要なテーブルと参照列は次のとおり。

```sql
albums(id, title)
posts(id, album_id, image_path, description, date)
```

`posts.album_id` は `albums.id` を参照する。album が存在しない場合、post の検索は行わず `404` を返す。

## 6. セキュリティ・運用仕様

- DB 接続情報は環境変数で渡し、ソースコードには保存しない。
- RDS 接続には TLS を使用する。
- DB パスワードではなく AWS RDS IAM 認証トークンを使用する。
- CI で `cargo audit` を実行する。
- API のエラー本文には DB 接続情報や SQL の詳細を含めない。
- `id` は URL path parameter として送信し、GET request body は使用しない。

## 7. 未実装 API

フロントエンドには次の API クライアント型があるが、現バックエンドの Lambda 仕様としては未実装である。

- `GET /highlight`
- `GET /albums`
- `GET /posts`
- upload に関する POST API
