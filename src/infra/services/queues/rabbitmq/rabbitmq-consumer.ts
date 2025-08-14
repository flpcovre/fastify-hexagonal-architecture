import { RabbitMQConnection } from '@/infra/services/queues/types';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';
import * as amqp from 'amqplib';


export class RabbitMQConsumer implements JobQueueConsumer {
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(
    private readonly config: RabbitMQConnection,
  ) {}

  private async ensureConnection(): Promise<void> {
    if (!this.connection || !this.channel) {
      const vhost = this.config.vhost || '/';
      const url = `amqp://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}${vhost}`;

      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
    }
  }

  public async consume<T = unknown>(queue: string, handler: (data: T) => Promise<void>): Promise<void> {
    await this.ensureConnection();

    if (!this.channel) {
      throw new Error('Failed to establish RabbitMQ connection');
    }

    await this.channel.assertQueue(queue, { durable: false });

    this.channel.consume(queue, async(msg) => {
      if (msg) {
        try {
          const data = JSON.parse(msg.content.toString()) as T;
          await handler(data);
          this.channel?.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          this.channel?.nack(msg, false, true);
        }
      }
    });
  }

  public async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}