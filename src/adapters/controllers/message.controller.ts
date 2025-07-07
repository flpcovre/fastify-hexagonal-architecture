import { ChatMessageParams, CreateChatMessageInput } from '@/adapters/http/routes/chats/schema';
import { CreateUserMessageUseCase } from '@/domain/chat/use-cases/create-user-message.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export class MessageController {
  constructor(
    private readonly createUserMessageUseCase: CreateUserMessageUseCase,
  ) {}

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