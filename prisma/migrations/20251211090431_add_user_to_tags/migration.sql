/*
  Warnings:

  - A unique constraint covering the columns `[tag,userId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NoteTags" DROP CONSTRAINT "NoteTags_tagId_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Tag_userId_idx" ON "Tag"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tag_userId_key" ON "Tag"("tag", "userId");

-- AddForeignKey
ALTER TABLE "NoteTags" ADD CONSTRAINT "NoteTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
