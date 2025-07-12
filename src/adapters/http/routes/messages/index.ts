import { chatMessageParamsSchema, createChatMessageSchema, createMessageResponseSchema, inboundMessageResponseSchema, inboundMessageSchema } from '@/adapters/http/routes/messages/schema';
import { FastifyTypedInstance } from '@/adapters/http/types';
import { makeMessageController } from '@/infra/factories/controllers/create-message-controller.factory';

const messageController = makeMessageController();

export async function messagesRoutes(app: FastifyTypedInstance) {
  app.post('/messages', {
    schema: {
      tags: ['messages'],
      description: 'Receive a new message from a customer',
      body: inboundMessageSchema,
      response: {
        201: inboundMessageResponseSchema,
      },
    },
  }, messageController.index.bind(messageController));

  app.post('/chats/:chatId/messages', {
    schema: {
      tags: ['messages'],
      description: 'Create a new user chat message',
      params: chatMessageParamsSchema,
      body: createChatMessageSchema,
      response: {
        201: createMessageResponseSchema,
      },
    },
  }, messageController.store.bind(messageController));
}

export default messagesRoutes;