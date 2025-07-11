import { EventBus } from '@/shared/domain/ports/event-bus';
import { EventEmitter } from 'events';

class SimpleEventBus implements EventBus {
  private emitter = new EventEmitter();

  public async publish<T extends object>(event: T): Promise<void> {
    this.emitter.emit(event.constructor.name, event);
  }

  public subscribe<T>(eventClass: new (...args: unknown[]) => T, handler: (event: T) => void): void {
    this.emitter.on(eventClass.name, handler);
  }
}

export const globalEventBus = new SimpleEventBus();