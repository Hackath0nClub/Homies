# Homies

# 開発環境

## 前提条件

事前に以下をインストールする

- [Git](https://github.com/git-guides/install-git) or [Git Bash](https://gitforwindows.org/)
- [Node](https://nodejs.org/ja/) (v18)
- [Docket](https://docs.docker.com/engine/install/)
- [Supabase CLI](https://supabase.com/docs/guides/resources/supabase-cli)

## Supabase

### 起動

```sh
supabase start
```

- [初期投入スキーマ](/supabase/seed.sql)

### 検証データ投入

```sh
cd ./supabase/init # .env 利用のためディレクトリ移動
node install
node init.mjs # 検証データ投入
cd ../../
```

- [投入データ](/supabase/init/data)

### ステータス確認

```sh
supabase status
```

### DB データリセット

```sh
supabase db reset
```

### 停止

```sh
supabase stop
```

## サービス

### ローカル用 env ファイル作成

```sh
cp ./app/.env.local.sample ./app/.env.local
```

### 起動

```sh
docker-compose up
# or
docker-compose up -d # バックグラウンド起動
```

- [docker-compose](/docker-compose.yml)

### 停止

```sh
docker-compose down
# or
docker-compose down -v # ボリュームも同時に削除
```

### node_modules/ をローカルへコピー

> **Note**  
> 処理軽量化のため node_modules/ はマウントしていない。
> そのため Docker 内のパッケージとローカルパッケージの同期は手動で行う。

> **Warning**  
> 管理者権限が必要

```sh
cd ./app
docker compose cp app:/usr/src/app/node_modules ./
```

### コンテナへの入り方

```sh
docker-compose exec app sh
```

### ログ出力

```sh
docker-compose logs -f app
```
