import { Message, MessageType } from '@/domain/chat/entities/message';
import { UserMessageCreatedEvent } from '@/domain/chat/events/user-message-created.event';
import { MessageRepository } from '@/domain/chat/ports/message-repository';
import { EventBus } from '@/shared/domain/ports/event-bus';
import { randomUUID } from 'crypto';

interface CreateUserMessageInputDto {
  chatId: string;
  content: string;
  type: MessageType;
  senderUserId: string;
}

interface CreateUserMessageOutputDto {
  id: string;
  createdAt: Date;
}

export class CreateUserMessageUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(input: CreateUserMessageInputDto): Promise<CreateUserMessageOutputDto> {
    const message = Message.make({
      id: randomUUID(),
      chatId: input.chatId,
      senderUserId: input.senderUserId,
      content: input.content,
      type: input.type,
      origin: 'user',
      whatsappKey: '123',
      read: false,
      createdAt: new Date(),
    });

    await this.messageRepository.create(message);
    await this.eventBus.publish(new UserMessageCreatedEvent(message));

    return {
      id: message.id,
      createdAt: message.createdAt,
    };
  }
}