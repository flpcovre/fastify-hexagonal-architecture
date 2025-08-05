import { BullMQConnection } from '@/infra/services/queues/types';
import { JobQueuePublisher } from '@/shared/domain/ports/job-queue-publisher';
import { Queue } from 'bullmq';

export class BullMQPublisher implements JobQueuePublisher {
  constructor(
    private readonly connection: BullMQConnection,
  ) {}

  public async publish<T = unknown>(queue: string, data: T): Promise<void> {
    const q = new Queue(queue, { connection: this.connection });
    await q.add('job', data);
  }
}