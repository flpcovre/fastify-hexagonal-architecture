export interface EventBus {
  publish<T extends object>(event: T): Promise<void>;
  subscribe<T>(eventClass: new (...args: unknown[]) => T, handler: (event: T) => void): void;
}