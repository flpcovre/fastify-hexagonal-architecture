/*
  Warnings:

  - You are about to drop the column `fileName` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `mediaKey` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `attachments` table. All the data in the column will be lost.
  - Added the required column `mime_type` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "fileName",
DROP COLUMN "mediaKey",
DROP COLUMN "mimeType",
ADD COLUMN     "file_name" TEXT,
ADD COLUMN     "media_key" TEXT,
ADD COLUMN     "mime_type" TEXT NOT NULL;
