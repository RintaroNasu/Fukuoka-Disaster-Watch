# Fukuoka Disaster Watch

## 課題

1.公開されている地物データ入手して、自前のデータベースに追加登録する。<br> 
2.検索条件を設定して、データベースから地物の絞り込み検索をする。<br> 
3.絞り込まれた検索結果を地図上に表示する。<br> 
4.その他便利な機能の実装をする。

--- 

## アプリ概要
**Fukuoka Disaster Watch**は、福岡県を対象にした災害情報共有プラットフォームです。

### 機能概要
1. **災害情報検索機能**: ユーザーは、土砂災害のポリゴンデータを地図上で視覚化し、市区町村単位で災害情報を検索<br>
2. **避難所一覧表示機能**: ユーザーは、福岡県の避難所を地図上の閲覧が可能<br>
2. **AI防災アドバイス機能**: AIを活用した地域ごとの防災アドバイスを提供し、災害発生時に迅速に対応できるようサポート<br>
3. **投稿機能**: ユーザーがリアルタイムで災害情報を投稿・共有できる機能を搭載しており、住民同士の情報共有を促進<br>
4. **通知機能**リアルタイム通知機能により、災害の最新情報を住民同士で迅速に伝達し、適切な対応を可能


---

## デモ動画
<table>
  <tr>
    <th>TOPページ</th>
    <th>ABOUTページ</th>
  </tr>
  <tr>
    <td><img width="500" alt="スクリーンショット 2024-12-20 16 57 48" src="https://github.com/user-attachments/assets/c0fae6af-a834-4c99-b8df-5b03f3b85a88" /></td>
    <td><img width="500" alt="スクリーンショット 2024-12-20 16 44 36" src="https://github.com/user-attachments/assets/2af8df03-6f93-4260-a7d6-41ee9e016af8" /></td>
  </tr>
  <tr>
    <th>ログインページ</th>
    <th>新規登録ページ</th>
  </tr>
   <tr>
    <td><img width="500" alt="スクリーンショット 2024-12-20 16 47 37" src="https://github.com/user-attachments/assets/6589b25b-4b7d-46ab-8389-c57488797f56" /></td>
    <td><img width="500" alt="スクリーンショット 2024-12-20 16 48 18" src="https://github.com/user-attachments/assets/7690cc16-4be5-4b97-99ed-d6da5fed7cd2" /></td>
  </tr>
  <tr>
    <th>土砂災害情報検索モーダル</th>
    <th>土砂災害情報表示</th>
  </tr>
   <tr>
    <td><img width="500" alt="image" src="https://github.com/user-attachments/assets/da208c10-1472-4b0c-b0e8-ca1c29d7bfaa" /></td>
    <td><img width="500" alt="スクリーンショット 2024-12-20 16 50 50" src="https://github.com/user-attachments/assets/d287456d-1f36-42a7-9d9a-4a5047b96df1" /></td>
  </tr>
  <tr>
    <th>災害詳細情報投稿ページ</th>
    <th>避難所表示</th>
  </tr>
   <tr>
    <td><img width="500" alt="スクリーンショット 2024-12-20 16 53 38" src="https://github.com/user-attachments/assets/a7f4076a-5afd-4ad7-8d69-4ee74d079f19" /></td>
    <td><img width="500" alt="スクリーンショット 2024-12-20 16 55 19" src="https://github.com/user-attachments/assets/1fc419b8-b54d-4682-a726-6ba1a32940b7" />
</td>
  </tr>
</table>


## 技術スタック

### 使用言語
  ・**[TypeScript](https://www.typescriptlang.org/)**
  
### フロントエンド 
  ・**[React](https://ja.react.dev/)**: ユーザーインターフェースの構築<br>
  ・**[Next.js (App Router)](https://nextjs.org/)**: サーバーサイドレンダリング対応のReactフレームワーク<br>
  ・**[TailwindCSS](https://tailwindcss.com/)**: カスタマイズ可能なCSSユーティリティ<br>
  ・**[React-Toastify](https://fkhadra.github.io/react-toastify/introduction/)**: トースト通知の表示ライブラリ<br>
  ・**[Leaflet](https://leafletjs.com/reference.html)**: 地図表示用の軽量ライブラリ<br>
  
### バックエンド
  ・**[NestJS](https://nestjs.com/)**: モジュール構造を持つNode.jsフレームワーク<br>
  ・**[Prisma](https://www.prisma.io/)**: データベースアクセスのためのORM<br>
  ・**[JWT](https://jwt.io/)**: JWTを使用した認証管理<br>
  ・**[Nodemailer](https://www.nodemailer.com/)**: メール送信ライブラリ<br>
  ・**[OpenAI](https://platform.openai.com/docs/api-reference/introduction)**: AI機能を実装するためのライブラリ<br>
  
### データベース
  ・**[PostgresSQL](https://www.postgresql.org/docs/)**: リレーショナルデータベース管理システム

### インフラ
  ・**[Docker](https://docs.docker.com/)**: コンテナ化プラットフォームで環境構築を効率化<br>
  ・**[Vercel](https://vercel.com/docs)**:フロントエンドのホスティングプラットフォーム

---

## 本番環境
### **フロントエンド**
  ・ https://fukuoka-disaster-watch.vercel.app
### **バックエンド**
  ・ renderとsuperbaseでデプロイ中

---

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
