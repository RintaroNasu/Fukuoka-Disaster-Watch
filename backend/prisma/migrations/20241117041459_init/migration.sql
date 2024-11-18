/*
  Warnings:

  - You are about to drop the column `name` on the `Fukuoka_water_info` table. All the data in the column will be lost.
  - Added the required column `flood_level` to the `Fukuoka_water_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefecture` to the `Fukuoka_water_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefecture_code` to the `Fukuoka_water_info` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `geometry` on the `Fukuoka_water_info` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Fukuoka_water_info" DROP COLUMN "name",
ADD COLUMN     "flood_level" TEXT NOT NULL,
ADD COLUMN     "prefecture" TEXT NOT NULL,
ADD COLUMN     "prefecture_code" TEXT NOT NULL,
DROP COLUMN "geometry",
ADD COLUMN     "geometry" JSONB NOT NULL;
