import { HasherService } from '@/shared/domain/ports/hasher-service';
import argon2 from 'argon2';

export class ArgonHasher implements HasherService {
  public async hash(value: string): Promise<string> {
    return await argon2.hash(value);
  }

  public async compare(value: string, hashedValue: string): Promise<boolean> {
    return await argon2.verify(hashedValue, value);
  }
}