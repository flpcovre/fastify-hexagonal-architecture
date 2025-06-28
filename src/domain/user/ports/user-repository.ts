import { User } from '@/domain/user/entities/user';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}