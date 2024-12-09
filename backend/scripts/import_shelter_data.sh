#!/bin/bash

# 引数からファイル名を取得
GEOJSON_FILE="safety_data/shelter.geojson"

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

# コンテナ立ち上げ
echo "Starting containers..."
docker compose up -d

running_containers () {
    DOCKER_STATUS=$(docker compose ps -q | xargs docker inspect -f '{{.State.Status}}')
    if echo "$DOCKER_STATUS" | grep -qv "running"; then
        return 1
    else
        return 0
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

# GeoJSONデータをコンテナにコピー
echo "Copying GeoJSON file to container's safety_data directory..."
docker exec "$CONTAINER_NAME" mkdir -p /safety_data
if docker cp "$GEOJSON_FILE" "$CONTAINER_NAME:/safety_data/$1.geojson"; then
    echo "GeoJSON file successfully copied to /safety_data directory in container."
else
    echo "Failed to copy GeoJSON file to /safety_data directory in container." >&2
    exit 1
fi

# マイグレーションの実行
echo "Running migrations..."
npx prisma migrate dev --name init
sleep 5

# GeoJSONデータをPostgreSQLにインポート
echo "Importing GeoJSON data into PostgreSQL..."
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME <<EOF
DO \$do\$
    DECLARE
        feature JSONB;
        properties JSONB;
        geometry JSONB;
    BEGIN
        FOR feature IN 
            SELECT jsonb_array_elements(content->'features') AS feature
            FROM (SELECT pg_read_file('/safety_data/$1.geojson')::jsonb AS content) AS t
        LOOP
            properties := feature -> 'properties';
            geometry := feature -> 'geometry';
            
            INSERT INTO "ShelterInfo" (
                name,
                address,
                shelter_type,
                capacity,
                level,
                latitude,
                longitude,
                coordinates
            )
            VALUES (
                properties->>'P20_002', -- name
                properties->>'P20_003', -- address
                properties->>'P20_004', -- shelter_type
                (properties->>'P20_005')::int, -- capacity
                (properties->>'レベル')::int, -- level
                (properties->>'緯度')::float, -- latitude
                (properties->>'経度')::float, -- longitude
                geometry -- coordinates (GeoJSON形式)
            );
        END LOOP;
    END
\$do\$;
EOF

echo "GeoJSON data import completed successfully."
