import { Attachment } from '@/domain/chat/entities/attachment';
import { MessageType } from '@/domain/chat/entities/message';
import { AttachmentRepository } from '@/domain/chat/ports/attachment-repository';
import { JobQueuePublisher } from '@/shared/domain/ports/job-queue-publisher';
import { randomUUID } from 'crypto';

interface CreateAttachmentInputDto {
  messageId: string;
  type: MessageType;
  mimeType: string;
  fileName?: string;
  mediaKey?: string;
}

export class CreateAttachmentUseCase {
  constructor(
    private readonly attachmentRepository: AttachmentRepository,
    private readonly jobQueuePublisher: JobQueuePublisher,
  ) {}

  public async execute(input: CreateAttachmentInputDto): Promise<void> {
    const attachment = Attachment.make({
      id: randomUUID(),
      messageId: input.messageId,
      type: input.type,
      mimeType: input.mimeType,
      fileName: input.fileName ?? null,
      mediaKey: input.mediaKey ?? null,
      url: null,
      status: 'pending',
      createdAt: new Date(),
    });

    await this.attachmentRepository.create(attachment);
    await this.jobQueuePublisher.publish('attachments', 'download-attachment', attachment);
  }
}