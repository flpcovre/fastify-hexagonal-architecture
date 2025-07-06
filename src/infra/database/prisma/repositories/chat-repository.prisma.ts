import { ChatRepository } from '@/domain/chat/ports/chat-repository';
import { Chat, PrismaClient } from '@prisma/client';

export class ChatRepositoryPrisma implements ChatRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(chat: Chat): Promise<void> {
    await this.prisma.chat.create({
      data: chat,
    });
  }

  public async findByCustomerId(customerId: string): Promise<Chat[]> {
    return await this.prisma.chat.findMany({
      where: {
        customerId,
      },
    });
  }

  public async findByUserId(userId: string): Promise<Chat[]> {
    return await this.prisma.chat.findMany({
      where: {
        userId,
      },
    });
  }

  public async findActiveByCustomerId(customerId: string): Promise<Chat | null> {
    return await this.prisma.chat.findFirst({
      where: {
        customerId,
        status: {
          in: ['inProgress', 'active'],
        },
      },
    });
  }
}