import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateChatInput } from '@/adapters/http/routes/chats/schema';
import { HandleIncomingCustomerUseCase } from '@/application/use-cases/handle-incoming-customer-message.use-case';

export class ChatController {
  constructor(
    private readonly handleIncomingCustomerUseCase: HandleIncomingCustomerUseCase,
  ) {}

  public async store(request: FastifyRequest<{ Body: CreateChatInput }>, reply: FastifyReply) {
    const { name, email, phone } = request.body;

    const result = await this.handleIncomingCustomerUseCase.execute({
      name,
      email,
      phone,
    });

    return reply.status(201).send(result);
  }
}