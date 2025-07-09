import { Attachment } from '@/domain/chat/entities/attachment';
import { AttachmentRepository } from '@/domain/chat/ports/attachment-repository';
import { PrismaClient } from '@prisma/client';

export class AttachmentRepositoryPrisma implements AttachmentRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(attachment: Attachment): Promise<void> {
    await this.prisma.attachment.create({
      data: attachment,
    });
  }
}