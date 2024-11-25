/*
  Warnings:

  - You are about to drop the column `flood_level` on the `Fukuoka_land_info` table. All the data in the column will be lost.
  - You are about to drop the column `prefecture` on the `Fukuoka_land_info` table. All the data in the column will be lost.
  - You are about to drop the column `prefecture_code` on the `Fukuoka_land_info` table. All the data in the column will be lost.
  - You are about to drop the `Fukuoka_water_info` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Fukuoka_land_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_name` to the `Fukuoka_land_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `record_date` to the `Fukuoka_land_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fukuoka_land_info" DROP COLUMN "flood_level",
DROP COLUMN "prefecture",
DROP COLUMN "prefecture_code",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "location_name" TEXT NOT NULL,
ADD COLUMN     "record_date" TEXT NOT NULL;

-- DropTable
DROP TABLE "Fukuoka_water_info";
