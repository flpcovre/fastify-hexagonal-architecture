import { User } from '@/domain/user/entities/user';
import { UserRepository } from '@/domain/user/ports/user-repository';
import { HasherService } from '@/shared/domain/ports/hasher-service';
import { JwtService } from '@/shared/domain/ports/jwt-service';

interface AuthenticateUserInputDto {
  email: string;
  password: string;
}

interface AuthenticateUserOutputDto {
  token: string,
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasherService: HasherService,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(input: AuthenticateUserInputDto): Promise<AuthenticateUserOutputDto> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.hasherService.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const authUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(authUser);

    return {
      token,
      user: authUser,
    };
  }
}