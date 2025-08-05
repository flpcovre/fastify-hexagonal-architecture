import { JOB_QUEUE_CONFIG } from '@/config/job-queue.config';
import { BullMQConsumer } from '@/infra/services/queues/bullmq/bullmq-consumer';
import { BullMQPublisher } from '@/infra/services/queues/bullmq/bullmq-publisher';
import { RabbitMQConsumer } from '@/infra/services/queues/rabbitmq/rabbitmq-consumer';
import { RabbitMQPublisher } from '@/infra/services/queues/rabbitmq/rabbitmq-publisher';
import { BullMQConnection, JobQueueServices, RabbitMQConnection } from '@/infra/services/queues/types';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';
import { JobQueuePublisher } from '@/shared/domain/ports/job-queue-publisher';

interface QueueServiceFactory {
  consumer: () => JobQueueConsumer
  publisher: () => JobQueuePublisher
}

const QUEUE_SERVICES: Record<JobQueueServices, QueueServiceFactory> = {
  RabbitMQ: {
    consumer: () => new RabbitMQConsumer(JOB_QUEUE_CONFIG.connection as RabbitMQConnection),
    publisher: () => new RabbitMQPublisher(JOB_QUEUE_CONFIG.connection as RabbitMQConnection),
  },
  BullMQ: {
    consumer: () => new BullMQConsumer(JOB_QUEUE_CONFIG.connection as BullMQConnection),
    publisher: () => new BullMQPublisher(JOB_QUEUE_CONFIG.connection as BullMQConnection),
  },
};

export const GlobalQueueConsumer: JobQueueConsumer = QUEUE_SERVICES[JOB_QUEUE_CONFIG.service].consumer();
export const GlobalQueuePublisher: JobQueuePublisher = QUEUE_SERVICES[JOB_QUEUE_CONFIG.service].publisher();