import { UserRepository } from '@/domain/user/ports/user-repository';

interface AuthenticateUserInputDto {
  email: string;
  password: string;
}

interface AuthenticateUserOutputDto {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(input: AuthenticateUserInputDto): Promise<AuthenticateUserOutputDto> {

  }
}