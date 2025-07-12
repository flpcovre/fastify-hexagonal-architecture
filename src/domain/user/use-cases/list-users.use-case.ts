import { UserRepository } from '@/domain/user/ports/user-repository';

interface ListUsersOutputDto {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'seller';
  createdAt: Date;
}

export class ListUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<ListUsersOutputDto[]> {
    const users = await this.userRepository.findAll();

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }
}