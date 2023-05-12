/*
  Warnings:

  - You are about to drop the column `clicks` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `clicksIpMap` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "clicks",
DROP COLUMN "clicksIpMap",
ADD COLUMN     "rating" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "ratingIpMap" JSONB;
