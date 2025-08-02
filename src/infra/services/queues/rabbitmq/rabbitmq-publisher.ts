import { JobQueuePublisher } from '@/shared/domain/ports/job-queue-publisher';
import { RabbitMQConnection } from './connection';
import * as amqp from 'amqplib';

export class RabbitMQPublisher implements JobQueuePublisher {
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

  public async publish<T = unknown>(queue: string, data: T): Promise<void> {
    await this.ensureConnection();

    if (!this.channel) {
      throw new Error('Failed to establish RabbitMQ connection');
    }

    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
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