import { Chat } from '@/domain/chat/entities/chat';
import { ChatRepository } from '@/domain/chat/ports/chat-repository';
import { randomUUID } from 'crypto';

interface CreateChatInputDto {
  customerId: string;
}

interface CreateChatOutputDto {
  id: string;
  customerId: string;
  status: 'active' | 'finished' | 'inProgress';
  createdAt: Date;
}

export class CreateChatUseCase {
  constructor(
    private readonly chatRepository: ChatRepository,
  ) {}

  public async execute(input: CreateChatInputDto): Promise<CreateChatOutputDto> {
    const customerChatInProgress = await this.chatRepository.findActiveByCustomerId(input.customerId);

    if (customerChatInProgress) throw new Error('Customer already has a chat active');

    const chat = Chat.make({
      id: randomUUID(),
      customerId: input.customerId,
      userId: null,
      status: 'active',
      createdAt: new Date(),
      finishedAt: null,
    });

    await this.chatRepository.create(chat);

    return {
      id: chat.id,
      customerId: chat.customerId,
      status: chat.status,
      createdAt: chat.createdAt,
    };
  }
}