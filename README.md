# Leafletを用いた地図アプリ開発

## 課題

1.公開されている地物データ入手して、自前のデータベースに追加登録する。2.検索条件を設定して、データベースから地物の絞り込み検索をする。3.絞り込まれた検索結果を地図上に表示する。4.その他便利な機能の実装をする。

## 開発環境のセットアップ手順

ローカル環境で開発サーバーを起動するための手順は以下の通りです。

1. リポジトリをクローン

```
git clone https://github.com/RintaroNasu/leaflet-app.git
```

### フロントエンド側セットアップ

```
2. フロントエンドディレクトリへ移動
```

cd frontend 3. 依存パッケージをインストール

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
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=leaflet
DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@localhost:5433/${POSTGRES_DB}"
```

7. Dockerコンテナを起動

```
docker compose up -d
```

8. Prismaクライアントを作成

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

・フロントエンド: Next.js<br>
・バックエンド: Nest.js<br>
・データベース: Postgres<br>
・ORM: Prisma
・使用ライブラリ: Leaflet
