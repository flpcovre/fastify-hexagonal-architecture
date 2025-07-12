import { Message } from '@/domain/chat/entities/message';

export interface MessageRepository {
  create(message: Message): Promise<void>;
}