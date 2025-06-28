import { HasherService } from '@/domain/user/ports/hasher-service';
import argon2 from 'argon2';

export class ArgonHasher implements HasherService {
  private readonly argon: typeof argon2;

  constructor() {
    this.argon = argon2;
  }

  public async hash(value: string): Promise<string> {
    return await argon2.hash(value);
  }

  public async compare(value: string, hashedValue: string): Promise<boolean> {
    return await argon2.verify(hashedValue, value);
  }
}