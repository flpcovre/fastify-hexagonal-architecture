import { Message } from '@/domain/chat/entities/message';

export class UserMessageCreatedEvent {
  readonly occurredAt: Date;

  constructor(public readonly message: Message) {
    this.occurredAt = new Date();
  }
}