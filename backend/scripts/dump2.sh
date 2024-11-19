#!/bin/bash

# ダンプファイルのパスを設定
GEOJSON_FILE="safety_data/Landslides.geojson"

# PostgreSQL コンテナ名
CONTAINER_NAME="db"

# データベース情報
DB_USER="postgres"
DB_NAME="leaflet"

# コンテナにファイルが存在するか確認
if [ ! -f "$GEOJSON_FILE" ]; then
    echo "GeoJSON file not found: $GEOJSON_FILE"
    exit 1
else 
    echo "GeoJSON file found: $GEOJSON_FILE"
fi

# Step 1: ローカルデータ削除
echo "Step 1: Removing local data volumes..."
docker compose down --volumes

# Step 2: コンテナ立ち上げ
echo "Step 2: Starting containers..."
docker compose up -d

running_containers () {
    DOCKER_STATUS=$(docker compose ps -q | xargs docker inspect -f '{{.State.Status}}')
    if echo "$DOCKER_STATUS" | grep -qv "running"; then
        return 1 #1が偽
    else
        return 0 #0が真
    fi
}

# コンテナが起動するまで待機
while ! running_containers; do
    sleep 1
done

# PostgreSQLの起動待機
echo "Waiting for PostgreSQL to be ready..."
until docker exec $CONTAINER_NAME pg_isready -U $DB_USER ; do
    sleep 3
done

# ステップ3: GeoJSONデータをコンテナにコピーする準備
echo "Creating safety_data directory in container..."
if docker exec "$CONTAINER_NAME" mkdir -p /safety_data; then
    echo "Directory /safety_data successfully created in container."
else
    echo "Failed to create directory /safety_data in container." >&2
    exit 1
fi

# ステップ4: GeoJSONデータをコンテナにコピー
echo "Copying GeoJSON file to container's safety_data directory..."
if docker cp "$GEOJSON_FILE" "$CONTAINER_NAME:/safety_data/Landslides.geojson"; then
    echo "GeoJSON file successfully copied to /safety_data directory in container."
else
    echo "Failed to copy GeoJSON file to /safety_data directory in container." >&2
    exit 1
fi

#ステップ5: マイグレーションの実行
echo "Running migrations..."
npx prisma migrate dev --name init
sleep 5

#ステップ6: GeoJSONデータをPostgreSQLにインポート
echo "Importing GeoJSON data into PostgreSQL..."
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME <<'EOF'
    DO $do$
        DECLARE
            feature JSONB;
            properties JSONB;
            geometry JSONB;
        BEGIN
            FOR feature IN 
                SELECT jsonb_array_elements(content->'features') AS feature
                FROM (SELECT pg_read_file('/safety_data/Landslides.geojson')::jsonb AS content) AS t
            LOOP
                properties := feature -> 'properties';
                geometry := feature -> 'geometry';
                
                INSERT INTO "Fukuoka_land_info"(prefecture, prefecture_code, flood_level, geometry)
                VALUES (
                    properties->>'A33_001',
                    properties->>'A33_002',
                    properties->>'A33_003',
                    geometry
                );
            END LOOP;
        END
    $do$;
EOF


