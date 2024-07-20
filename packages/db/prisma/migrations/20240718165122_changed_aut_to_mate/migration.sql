/*
  Warnings:

  - You are about to drop the column `autId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `autId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the `Aut` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AutRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AutRunOutbox` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mateId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mateId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mateId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_autId_fkey";

-- DropForeignKey
ALTER TABLE "Aut" DROP CONSTRAINT "Aut_userId_fkey";

-- DropForeignKey
ALTER TABLE "AutRun" DROP CONSTRAINT "AutRun_autId_fkey";

-- DropForeignKey
ALTER TABLE "AutRunOutbox" DROP CONSTRAINT "AutRunOutbox_autRunId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_autId_fkey";

-- DropIndex
DROP INDEX "Trigger_autId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "autId",
ADD COLUMN     "mateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "autId",
ADD COLUMN     "mateId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Aut";

-- DropTable
DROP TABLE "AutRun";

-- DropTable
DROP TABLE "AutRunOutbox";

-- CreateTable
CREATE TABLE "Mate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateRun" (
    "id" TEXT NOT NULL,
    "mateId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MateRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateRunOutbox" (
    "id" TEXT NOT NULL,
    "mateRunId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MateRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MateRunOutbox_mateRunId_key" ON "MateRunOutbox"("mateRunId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_mateId_key" ON "Trigger"("mateId");

-- AddForeignKey
ALTER TABLE "Mate" ADD CONSTRAINT "Mate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_mateId_fkey" FOREIGN KEY ("mateId") REFERENCES "Mate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_mateId_fkey" FOREIGN KEY ("mateId") REFERENCES "Mate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateRun" ADD CONSTRAINT "MateRun_mateId_fkey" FOREIGN KEY ("mateId") REFERENCES "Mate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateRunOutbox" ADD CONSTRAINT "MateRunOutbox_mateRunId_fkey" FOREIGN KEY ("mateRunId") REFERENCES "MateRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
