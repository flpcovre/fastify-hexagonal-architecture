export interface JobQueuePublisher {
  publish<T = unknown>(queue: string, data: T): Promise<void>;
}