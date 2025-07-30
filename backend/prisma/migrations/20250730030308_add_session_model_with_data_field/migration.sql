/*
  Warnings:

  - Added the required column `data` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "data" TEXT NOT NULL;
