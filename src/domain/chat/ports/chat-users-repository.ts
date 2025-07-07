import { ChatUsers } from '@/domain/chat/entities/chat-users';

export interface ChatUsersRepository {
  create(chatUsers: ChatUsers): Promise<void>;
}