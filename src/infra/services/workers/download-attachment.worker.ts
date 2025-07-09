import { BullMQConsumer } from '@/infra/services/queues/bullmq/bullmq-consumer';

const consumer = new BullMQConsumer({
  host: 'redis',
  port: 6379,
});

consumer.consume('attachments', 'download-attachment', async(data) => {
  await new Promise(resolve => setTimeout(resolve, 10000));
  console.log(data);
});