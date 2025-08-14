export interface JobQueueConsumer {
  consume<T = unknown>(queue: string, handler: (data: T) => Promise<void>): void;
}