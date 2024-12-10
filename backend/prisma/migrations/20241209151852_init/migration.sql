-- CreateTable
CREATE TABLE "ShelterInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "shelter_type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "ShelterInfo_pkey" PRIMARY KEY ("id")
);
