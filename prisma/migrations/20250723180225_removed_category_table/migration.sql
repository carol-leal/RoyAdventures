/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseCategory" DROP CONSTRAINT "ExerciseCategory_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT;

-- DropTable
DROP TABLE "ExerciseCategory";
