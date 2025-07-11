import { Attachment } from '@/domain/chat/entities/attachment';

export class AttachmentCreatedEvent {
  readonly occurredAt: Date;

  constructor(public readonly attachment: Attachment) {
    this.occurredAt = new Date();
  }
}
