import { createChatResponseSchema, createChatSchema } from '@/adapters/http/routes/chats/schema';
import { FastifyTypedInstance } from '@/adapters/http/types/types';
import { makeChatController } from '@/infra/factories/controllers/create-chat-controller.factory';

const chatController = makeChatController();

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
}

export default chatsRoutes;