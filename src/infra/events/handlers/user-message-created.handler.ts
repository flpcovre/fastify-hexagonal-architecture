import { UserMessageCreatedEvent } from '@/domain/chat/events/user-message-created.event';
import { JobQueuePublisher } from '@/shared/domain/ports/job-queue-publisher';

export class UserMessageCreatedEventHandler {
  constructor(
    private readonly queue: JobQueuePublisher,
  ) {}

  public async handle(event: UserMessageCreatedEvent): Promise<void> {
    await this.queue.publish('send-user-message-queue', event.message);
  }
}