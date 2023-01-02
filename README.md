# Homies

## docker-composeコマンドサマリ

### 起動

```sh
docker-compose up
# or
docker-compose up -d # バックグラウンド起動
```

### 停止

```sh
docker-compose down
# or
docker-compose down -v # ボリュームも同時に削除
```

### node_modules/ をローカルへコピー

※管理者権限が必要

```sh
docker compose cp app:/usr/src/app/node_modules [appへのパス]
# ex) docker compose cp app:/usr/src/app/node_modules ./app
```

### コンテナへの入り方

```sh
docker-compose exec app sh
```

### ログ出力

```sh
docker-compose logs -f app
```