import { Message, MessageType } from '@/domain/chat/entities/message';
import { MessageRepository } from '@/domain/chat/ports/message-repository';
import { CreateCustomerAttachmentUseCase } from '@/domain/chat/use-cases/attachments/create-customer-attachment.use-case';
import { randomUUID } from 'crypto';

interface CreateCustomerMessageInputDto {
  chatId: string;
  content: string;
  type: MessageType;
  whatsappKey: string;
  media?: {
    id: string;
    type: MessageType;
    mimeType: string;
    fileName?: string;
    mediaKey?: string;
  };
}

export class CreateCustomerMessageUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly createCustomerAttachmentUseCase: CreateCustomerAttachmentUseCase,
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

    if (input.media) {
      await this.createCustomerAttachmentUseCase.execute({
        messageId: message.id,
        type: input.media.type,
        mimeType: input.media.mimeType,
        fileName: input.media.fileName,
        mediaKey: input.media.mediaKey,
      });
    }
  }
}