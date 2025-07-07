import { ChatUsers } from '@/domain/chat/entities/chat-users';
import { ChatUsersRepository } from '@/domain/chat/ports/chat-users-repository';

interface CreateChatUserInputDto {
  chatId: string;
  userId: string;
}

export class CreateChatUserUseCase {
  constructor(
    private readonly chatUsersRepository: ChatUsersRepository,
  ) {}

  public async execute(input: CreateChatUserInputDto): Promise<void> {
    const chatUser = ChatUsers.make({
      chatId: input.chatId,
      userId: input.userId,
      createdAt: new Date(),
    });

    await this.chatUsersRepository.create(chatUser);
  }
}