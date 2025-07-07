import { chatMessageParamsSchema, createChatMessageSchema, createChatResponseSchema, createChatSchema, createMessageResponseSchema } from '@/adapters/http/routes/chats/schema';
import { FastifyTypedInstance } from '@/adapters/http/types';
import { makeChatController } from '@/infra/factories/controllers/create-chat-controller.factory';
import { makeMessageController } from '@/infra/factories/controllers/create-message-controller.factory';

const chatController = makeChatController();
const messageController = makeMessageController();

export async function chatsRoutes(app: FastifyTypedInstance) {
  app.post('/chats', {
    schema: {
      tags: ['chats'],
      description: 'Create a new chat',
      body: createChatSchema,
      response: {
        201: createChatResponseSchema,
      },
    },
  }, chatController.store.bind(chatController));

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

export default chatsRoutes;