import { Message } from '@/domain/chat/entities/message';
import { BullMQConsumer } from '@/infra/services/queues/bullmq/bullmq-consumer';

const consumer = new BullMQConsumer({
  host: 'redis',
  port: 6379,
});

consumer.consume<Message>('messages', 'send-user-message', async(data) => {
  console.log(data);
  console.log('User message sending completed');
});