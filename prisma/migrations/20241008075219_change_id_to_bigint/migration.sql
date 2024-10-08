/*
  Warnings:

  - You are about to drop the `SavedJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SavedJob";

-- CreateTable
CREATE TABLE "saved_job" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "redirectUrl" TEXT,

    CONSTRAINT "saved_job_pkey" PRIMARY KEY ("id")
);
