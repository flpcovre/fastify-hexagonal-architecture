import { Message } from '@/domain/chat/entities/message';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';

export class SendUserMessageWorker {
  constructor(
    private readonly consumer: JobQueueConsumer,
  ){}

  public register(): void {
    this.consumer.consume<Message>('send-user-message-queue', async(data) => {
      console.log(data);
      console.log('User message sending completed');
    });
  }
}