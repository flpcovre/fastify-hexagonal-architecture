import { Connection } from '@/infra/services/queues/connection';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';
import { Worker } from 'bullmq';

export class BullMQConsumer implements JobQueueConsumer {
  constructor(
    private readonly connection: Connection,
  ) {}

  public consume<T = unknown>(queue: string, jobName: string, handler: (data: T) => Promise<void>): void {
    new Worker(queue, async(job) => {
      if (job.name === jobName) {
        await handler(job.data);
      }
    }, { connection: this.connection });
  }
}