# Canvas albums backend

album の内容を返す AWS Lambda 関数です。API Gateway などの HTTP エンドポイントから album ID をパスパラメータで受け取り、PostgreSQL から album と投稿を取得します。

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Cargo Lambda](https://www.cargo-lambda.info/guide/installation.html)
- PostgreSQL
- AWS 認証情報（RDS IAM 認証トークンの生成に使用）

## 環境変数

| 変数 | 内容 |
| --- | --- |
| `DB_HOSTNAME` | PostgreSQL / RDS のホスト名 |
| `DB_PORT` | DB ポート（通常 `5432`） |
| `DB_NAME` | データベース名 |
| `DB_USERNAME` | DB ユーザー名 |
| `AWS_REGION` | RDS IAM 認証に使用する AWS リージョン |

Lambda 実行ロールには、RDS IAM 認証に必要な権限を付与してください。

## API

```http
GET /albums/{id}
```

成功時は `AlbumContent` を返します。`id` 未指定時は `400`、存在しない album は `404` です。

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

データベースには少なくとも `albums(id, title)` と `posts(id, album_id, image_path, description, date)` が必要です。

## ビルド

To build the project for production, run `cargo lambda build --release`. Remove the `--release` flag to build for development.

Read more about building your lambda function in [the Cargo Lambda documentation](https://www.cargo-lambda.info/commands/build.html).

## テストとローカル実行

You can run regular Rust unit tests with `cargo test`.

If you want to run integration tests locally, you can use the `cargo lambda watch` and `cargo lambda invoke` commands to do it.

First, run `cargo lambda watch` to start a local server. When you make changes to the code, the server will automatically restart.

Second, you'll need a way to pass the event data to the lambda function.

You can use the existent [event payloads](https://github.com/awslabs/aws-lambda-rust-runtime/tree/main/lambda-events/src/fixtures) in the Rust Runtime repository if your lambda function is using one of the supported event types.

You can use those examples directly with the `--data-example` flag, where the value is the name of the file in the [lambda-events](https://github.com/awslabs/aws-lambda-rust-runtime/tree/main/lambda-events/src/fixtures) repository without the `example_` prefix and the `.json` extension.

```bash
cargo lambda invoke --data-example apigw-request
```

For generic events, where you define the event data structure, you can create a JSON file with the data you want to test with. For example:

```json
{
    "command": "test"
}
```

Then, run `cargo lambda invoke --data-file ./data.json` to invoke the function with the data in `data.json`.

For HTTP events, you can also call the function directly with cURL or any other HTTP client. For example:

```bash
curl https://localhost:9000
```

Read more about running the local server in [the Cargo Lambda documentation for the `watch` command](https://www.cargo-lambda.info/commands/watch.html).
Read more about invoking the function in [the Cargo Lambda documentation for the `invoke` command](https://www.cargo-lambda.info/commands/invoke.html).

## デプロイ

To deploy the project, run `cargo lambda deploy`. This will create an IAM role and a Lambda function in your AWS account.

Read more about deploying your lambda function in [the Cargo Lambda documentation](https://www.cargo-lambda.info/commands/deploy.html).
