import { AttachmentCreatedEvent } from '@/domain/chat/events/attachment-created.event';
import { JobQueuePublisher } from '@/shared/domain/ports/job-queue-publisher';

export class AttachmentCreatedEventHandler {
  constructor(
    private readonly queue: JobQueuePublisher,
  ) {}

  public async handle(event: AttachmentCreatedEvent): Promise<void> {
    await this.queue.publish('attachments', 'download-attachment', event.attachment);
  }
}