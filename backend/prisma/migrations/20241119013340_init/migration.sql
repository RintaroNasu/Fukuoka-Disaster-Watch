-- CreateTable
CREATE TABLE "Fukuoka_land_info" (
    "id" SERIAL NOT NULL,
    "prefecture" TEXT NOT NULL,
    "prefecture_code" TEXT NOT NULL,
    "flood_level" TEXT NOT NULL,
    "geometry" JSONB NOT NULL,

    CONSTRAINT "Fukuoka_land_info_pkey" PRIMARY KEY ("id")
);
