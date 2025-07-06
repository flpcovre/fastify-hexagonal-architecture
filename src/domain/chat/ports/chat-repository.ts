import { Chat } from '@prisma/client';

export interface ChatRepository {
  create(chat: Chat): Promise<void>;
  findByCustomerId(customerId: string): Promise<Chat[]>;
  findByUserId(userId: string): Promise<Chat[]>;
  findActiveByCustomerId(customerId: string): Promise<Chat | null>;
}