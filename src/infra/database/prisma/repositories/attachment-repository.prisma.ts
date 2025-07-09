import { Attachment, AttachmentStatus } from '@/domain/chat/entities/attachment';
import { AttachmentRepository } from '@/domain/chat/ports/attachment-repository';
import { PrismaClient } from '@prisma/client';

export class AttachmentRepositoryPrisma implements AttachmentRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async updateStatus(id: string, status: AttachmentStatus, url: string): Promise<void> {
    await this.prisma.attachment.update({
      where: { id },
      data: { status, url },
    });
  }

  public async create(attachment: Attachment): Promise<void> {
    await this.prisma.attachment.create({
      data: attachment,
    });
  }
}