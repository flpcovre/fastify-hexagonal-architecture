export type EventClassConstructor<T> = abstract new (...args: never[]) => T;

export interface EventBus {
  publish<T extends object>(event: T): Promise<void>;
  subscribe<T>(eventClass: EventClassConstructor<T>, handler: (event: T) => void): void;
}