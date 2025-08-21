import { Attachment } from '@/domain/chat/entities/attachment';
import { MessageType } from '@/domain/chat/entities/message';
import { CustomerAttachmentCreatedEvent } from '@/domain/chat/events/customer-attachment-created.event';
import { AttachmentRepository } from '@/domain/chat/ports/attachment-repository';
import { EventBus } from '@/shared/domain/ports/event-bus';
import { randomUUID } from 'crypto';

interface CreateAttachmentInputDto {
  messageId: string;
  type: MessageType;
  mimeType:  string;
  fileName?: string;
  mediaKey: string;
}

export class CreateCustomerAttachmentUseCase {
  constructor(
    private readonly attachmentRepository: AttachmentRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(input: CreateAttachmentInputDto): Promise<void> {
    const attachment = Attachment.make({
      id: randomUUID(),
      messageId: input.messageId,
      type: input.type,
      mimeType: input.mimeType,
      fileName: input.fileName ?? null,
      mediaKey: input.mediaKey,
      url: null,
      status: 'pending',
      createdAt: new Date(),
    });

    await this.attachmentRepository.create(attachment);
    await this.eventBus.publish(new CustomerAttachmentCreatedEvent(attachment));
  }
}