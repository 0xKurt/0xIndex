/*
  Warnings:

  - Added the required column `chainId` to the `Blockchain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blockchain" ADD COLUMN     "chainId" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "ProjectProposal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "link" TEXT,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blockchains" TEXT[],
    "categories" TEXT[],

    CONSTRAINT "ProjectProposal_pkey" PRIMARY KEY ("id")
);
