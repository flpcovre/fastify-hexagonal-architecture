import { HasherService } from '@/domain/user/ports/hasher-service';
import bcrypt from 'bcrypt';

export class BcryptHasher implements HasherService {
  private readonly bcrypt: typeof bcrypt;

  constructor() {
    this.bcrypt = bcrypt;
  }

  public async hash(value: string): Promise<string> {
    return await this.bcrypt.hash(value, 10);
  }

  public async compare(value: string, hashedValue: string): Promise<boolean> {
    return await this.bcrypt.compare(value, hashedValue);
  }
}