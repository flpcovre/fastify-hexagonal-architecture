import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateChatInput } from '@/adapters/http/routes/chats/schema';
import { CreateChatWithCustomerPhoneUseCase } from '@/application/use-cases/create-chat-with-customer-phone.use-case';

export class ChatController {
  constructor(
    private readonly createChatWithCustomerPhoneUseCase: CreateChatWithCustomerPhoneUseCase,
  ) {}

  public async store(request: FastifyRequest<{ Body: CreateChatInput }>, reply: FastifyReply) {
    const { phone } = request.body;

    const result = await this.createChatWithCustomerPhoneUseCase.execute({
      phone,
    });

    return reply.status(201).send(result);
  }
}