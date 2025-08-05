import { AuthInput } from '@/adapters/http/routes/auth/schema';
import { AuthenticateUserUseCase } from '@/domain/user/use-cases/authenticate-user.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  public async auth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = request.body as AuthInput;

    const result = await this.authenticateUserUseCase.execute({ email, password });

    return reply.status(200).send(result);
  }

  public async me(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.authenticatedUser;

    return reply.status(200).send(user);
  }
}