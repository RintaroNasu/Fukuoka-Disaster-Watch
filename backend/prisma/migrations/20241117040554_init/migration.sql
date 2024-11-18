/*
  Warnings:

  - You are about to drop the `Polygon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Polygon";

-- CreateTable
CREATE TABLE "Fukuoka_water_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geometry" TEXT NOT NULL,

    CONSTRAINT "Fukuoka_water_info_pkey" PRIMARY KEY ("id")
);
