import { CreateUserInput } from '@/adapters/http/routes/users/schema';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user.use-case';
import { ListUsersUseCase } from '@/domain/user/use-cases/list-users.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ){}

  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await this.listUsersUseCase.execute();
    return reply.status(200).send(users);
  }

  public async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password, role } = request.body as CreateUserInput;

    const user = await this.createUserUseCase.execute({ name, email, password, role });

    return reply.status(201).send(user);
  }
}