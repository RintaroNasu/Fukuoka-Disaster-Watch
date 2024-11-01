-- CreateTable
CREATE TABLE "Polygon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geometry" TEXT NOT NULL,

    CONSTRAINT "Polygon_pkey" PRIMARY KEY ("id")
);
