import { Message } from '@/domain/chat/entities/message';
import { MessageRepository } from '@/domain/chat/ports/message-repository';
import { PrismaClient } from '@prisma/client';

export class MessageRepositoryPrisma implements MessageRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(message: Message): Promise<void> {
    await this.prisma.message.create({
      data: message,
    });
  }
}