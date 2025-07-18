import { Connection } from '@/infra/services/queues/bullmq/connection';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';
import { Worker } from 'bullmq';

export class BullMQConsumer implements JobQueueConsumer {
  constructor(
    private readonly connection: Connection,
  ) {}

  public consume<T = unknown>(queue: string, handler: (data: T) => Promise<void>): void {
    new Worker(queue, async(job) => {
      await handler(job.data);
    }, { connection: this.connection });
  }
}