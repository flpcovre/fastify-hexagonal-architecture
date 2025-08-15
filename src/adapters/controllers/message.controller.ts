import { ChatMessageParams, CreateChatMessageInput } from '@/adapters/http/routes/messages/schema';
import { HandleIncomingCustomerMessageUseCase } from '@/application/use-cases/message/handle-incoming-customer-message.use-case';
import { CreateUserMessageUseCase } from '@/domain/chat/use-cases/messages/create-user-message.use-case';
import { WhatsAppMessageMapper } from '@/infra/mappers/whatsapp/whatsapp-message.mapper';
import { FastifyReply, FastifyRequest } from 'fastify';

export class MessageController {
  constructor(
    private readonly createUserMessageUseCase: CreateUserMessageUseCase,
    private readonly handleIncomingCustomerMessageUseCase: HandleIncomingCustomerMessageUseCase,
    private readonly whatsappMessageMapper: WhatsAppMessageMapper<unknown>,
  ) {}

  public async index(request: FastifyRequest, reply: FastifyReply) {
    const whatsappMessage = this.whatsappMessageMapper.toDomain(request.body);
    const message = await this.handleIncomingCustomerMessageUseCase.execute(whatsappMessage);

    return reply.status(201).send(message);
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