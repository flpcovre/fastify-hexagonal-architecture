import { Message, MessageType } from '@/domain/chat/entities/message';
import { MessageRepository } from '@/domain/chat/ports/message-repository';
import { randomUUID } from 'crypto';

interface CreateCustomerMessageInputDto {
  chatId: string;
  content: string;
  type: MessageType;
  whatsappKey: string;
}

export class CreateCustomerMessageUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
  ) {}

  public async execute(input: CreateCustomerMessageInputDto): Promise<void> {
    const message = Message.make({
      id: randomUUID(),
      chatId: input.chatId,
      senderUserId: null,
      content: input.content,
      type: input.type,
      origin: 'customer',
      whatsappKey: input.whatsappKey,
      read: false,
      createdAt: new Date(),
    });

    await this.messageRepository.create(message);
  }
}