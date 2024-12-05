# Leaflet を用いた地図アプリ開発

## 課題

1.公開されている地物データ入手して、自前のデータベースに追加登録する。<br> 2.検索条件を設定して、データベースから地物の絞り込み検索をする。<br> 3.絞り込まれた検索結果を地図上に表示する。<br> 4.その他便利な機能の実装をする。

## アプリ概要
1. 福岡県を対象とした災害情報共有プラットフォーム<br>
2. ユーザーは、土砂災害のポリゴンデータを地図上で視覚化し、市区町村単位で災害情報を検索<br>
3. AIを活用した地域ごとの防災アドバイスを提供し、災害発生時に迅速に対応できるようサポート<br>
4. ユーザーがリアルタイムで災害情報を投稿・共有できる機能を搭載しており、住民同士の情報共有を促進<br>
5. リアルタイム通知機能により、災害の最新情報を住民同士で迅速に伝達し、適切な対応を可能

## 開発環境のセットアップ手順

ローカル環境で開発サーバーを起動するための手順は以下の通りです。

1. リポジトリをクローン

```
git clone https://github.com/RintaroNasu/leaflet-app.git
```

### フロントエンド側セットアップ

2. フロントエンドディレクトリへ移動

```
cd frontend
```

3. 依存パッケージをインストール

```
npm install
```

4. サーバー立ち上げ

```
npm run dev
```

### バックエンド側セットアップ

5. バックエンドディレクトリへ移動

```
cd backend
```

6. ルートディレクトリに .env ファイルを作成し、以下の内容を追加

```
POSTGRES_USER= "your_postgres_user"
POSTGRES_PASSWORD= "your_postgres_password"
POSTGRES_DB= "your_postgres_db"
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5433/${POSTGRES_DB}"
OPENAI_API_KEY= "your_openai_api_key"
JWT_SECRET= "your_jwt_secret"
EMAIL_USER= "your_email_user"
EMAIL_PASSWORD= "your_email_password"
```

7. Docker コンテナを起動

```
docker compose up -d
```

8. Prisma クライアントを作成

```
npx prisma generate
```

9. マイグレーションを実行

```
npx prisma migrate dev --name init
```

10. バックエンドサーバーを起動

```
npm run start:dev
```

## 技術スタック

### 共通使用言語
  ・[TypeScript](https://www.typescriptlang.org/)
  
### フロントエンド 
  ・[React](https://ja.react.dev/): ユーザーインターフェースの構築<br>
  ・[Next.js (App Router)](https://nextjs.org/): サーバーサイドレンダリング対応のReactフレームワーク<br>
  ・[TailwindCSS](https://tailwindcss.com/): カスタマイズ可能なCSSユーティリティ<br>
  ・[React-Toastify](https://fkhadra.github.io/react-toastify/introduction/): トースト通知の表示ライブラリ<br>
  ・[Leaflet](https://leafletjs.com/reference.html): 地図表示用の軽量ライブラリ<br>
  
### バックエンド
  ・[NestJS](https://nestjs.com/): モジュール構造を持つNode.jsフレームワーク<br>
  ・[Prisma](https://www.prisma.io/): データベースアクセスのためのORM<br>
  ・[jsonwebtoken](https://jwt.io/): JWTを使用した認証管理<br>
  ・[Nodemailer](https://www.nodemailer.com/): メール送信ライブラリ<br>
  ・[OpenAI](https://platform.openai.com/docs/api-reference/introduction): AI機能を実装するためのライブラリ<br>
  
### データベース
  ・[PostgresSQL](https://www.postgresql.org/docs/): リレーショナルデータベース管理システム

### インフラ
  ・[Docker](https://docs.docker.com/): コンテナ化プラットフォームで環境構築を効率化
