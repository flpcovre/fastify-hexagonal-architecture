import { ChatRepository } from '@/domain/chat/ports/chat-repository';

interface FindActiveCustomerChatInputDto {
  customerId: string;
}

interface FindActiveCustomerChatOutputDto {
  id: string;
  customerId: string;
  status: 'active' | 'finished' | 'inProgress';
  createdAt: Date;
}

export class FindActiveCustomerChatUseCase {
  constructor(
    private readonly chatRepository: ChatRepository,
  ) {}

  public async execute(input: FindActiveCustomerChatInputDto): Promise<FindActiveCustomerChatOutputDto | null> {
    const chat = await this.chatRepository.findActiveByCustomerId(input.customerId);

    if (!chat) return null;

    return {
      id: chat.id,
      customerId: chat.customerId,
      status: chat.status,
      createdAt: chat.createdAt,
    };
  }
}