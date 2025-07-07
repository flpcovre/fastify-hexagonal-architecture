import { ChatController } from '@/adapters/controllers/chat.controller';
import { HandleIncomingCustomerUseCase } from '@/application/use-cases/handle-incoming-customer-message.use-case';

export function makeChatController(): ChatController {
  const createChatWithCustomerOrchestrator = new HandleIncomingCustomerUseCase();

  return new ChatController(createChatWithCustomerOrchestrator);
}