import { User } from '@/domain/user/entities/user';
import { HasherService } from '@/shared/domain/ports/hasher-service';
import { UserRepository } from '@/domain/user/ports/user-repository';
import { randomUUID } from 'crypto';

interface CreateUserInputDto {
  name: string;
  email: string;
  password: string;
}

interface CreateUserOutputDto {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'seller';
  createdAt: Date;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasherService: HasherService,
  ) {}

  public async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const userAlreadyExists = await this.userRepository.findByEmail(input.email);

    if (userAlreadyExists) throw new Error('User already exists');

    const user = User.make({
      id: randomUUID(),
      name: input.name,
      email: input.email,
      password: await this.hasherService.hash(input.password),
      role: 'customer',
      createdAt: new Date(),
    });

    await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}