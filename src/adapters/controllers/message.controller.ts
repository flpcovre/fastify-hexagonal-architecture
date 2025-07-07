import { ChatMessageParams, CreateChatMessageInput, InboundMessageInput } from '@/adapters/http/routes/messages/schema';
import { HandleIncomingCustomerMessageUseCase } from '@/application/use-cases/handle-incoming-customer-message.use-case';
import { CreateUserMessageUseCase } from '@/domain/chat/use-cases/create-user-message.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export class MessageController {
  constructor(
    private readonly createUserMessageUseCase: CreateUserMessageUseCase,
    private readonly handleIncomingCustomerMessageUseCase: HandleIncomingCustomerMessageUseCase,
  ) {}

  public async index(request: FastifyRequest<{ Body: InboundMessageInput }>, reply: FastifyReply) {
    await this.handleIncomingCustomerMessageUseCase.execute(request.body);

    return reply.status(201).send({
      id: request.body.id,
      createdAt: new Date(),
    });
  }

  public async store(request: FastifyRequest<{ Body: CreateChatMessageInput, Params: ChatMessageParams }>, reply: FastifyReply) {
    const { userId, content, type } = request.body;

    const message = await this.createUserMessageUseCase.execute({
      chatId: request.params.chatId,
      content,
      type,
      senderUserId: userId,
    });

    return reply.status(201).send(message);
  }
}