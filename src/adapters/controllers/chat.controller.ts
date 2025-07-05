import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateChatWithCustomerOrchestrator } from '@/application/orchestrators/create-chat-with-customer.orchestrator';
import { CreateChatInput } from '@/adapters/http/routes/chats/schema';

export class ChatController {
  constructor(
    private readonly createChatWithCustomerOrchestrator: CreateChatWithCustomerOrchestrator,
  ) {}

  public async store(request: FastifyRequest<{ Body: CreateChatInput }>, reply: FastifyReply) {
    const { name, email, phone } = request.body;

    const result = await this.createChatWithCustomerOrchestrator.execute({
      name,
      email,
      phone,
    });

    return reply.status(201).send(result);
  }
}