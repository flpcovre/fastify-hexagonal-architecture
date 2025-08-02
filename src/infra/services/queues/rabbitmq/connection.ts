export interface RabbitMQConnection {
  host: string;
  port: number;
  username: string;
  password: string;
  vhost?: string;
}