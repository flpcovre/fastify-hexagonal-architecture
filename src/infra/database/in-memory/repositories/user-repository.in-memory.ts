import { User } from '@/domain/user/entities/user';
import { UserRepository } from '@/domain/user/ports/user-repository';

const users: User[] = [];

export class UserRepositoryInMemory implements UserRepository {
  public async findAll(): Promise<User[]> {
    return users;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return users.find(user => user.email === email) || null;
  }

  public async create(user: User): Promise<void> {
    users.push(user);
  }
}