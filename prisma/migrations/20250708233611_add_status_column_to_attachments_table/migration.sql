-- CreateEnum
CREATE TYPE "AttachmentStatus" AS ENUM ('pending', 'failed', 'processed');

-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "status" "AttachmentStatus" NOT NULL DEFAULT 'pending';
