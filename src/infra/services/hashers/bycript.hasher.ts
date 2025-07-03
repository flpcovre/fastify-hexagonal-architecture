import { HasherService } from '@/shared/domain/ports/hasher-service';
import bcrypt from 'bcrypt';

export class BcryptHasher implements HasherService {
  public async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  public async compare(value: string, hashedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue);
  }
}