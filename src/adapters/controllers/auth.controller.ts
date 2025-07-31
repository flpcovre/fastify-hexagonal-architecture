import { AuthInput } from '@/adapters/http/routes/auth/schema';
import { AuthenticateUserUseCase } from '@/domain/user/use-cases/authenticate-user.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  public async auth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = request.body as AuthInput;

    const user = this.authenticateUserUseCase.execute({ email, password });

    return reply.status(201).send(user);
  }
}