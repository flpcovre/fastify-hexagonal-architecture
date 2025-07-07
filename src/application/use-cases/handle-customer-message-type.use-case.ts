import { InboundMessageDto } from '@/application/dtos/inbound-message.dto';
import { MessageType } from '@/domain/chat/entities/message';

export class HandleCustomerMessageTypeUseCase {
  public async execute(input: InboundMessageDto): Promise<void> {
    const messageActions: Record<MessageType, () => void> = {
      text: () => {
        console.log('text');
      },
      image: () => {
        console.log('image');
      },
      audio: () => {
        console.log('audio');
      },
      video: () => {
        console.log('video');
      },
      file: () => {
        console.log('file');
      },
      location: () => {
        console.log('location');
      },
      contact: () => {
        console.log('contact');
      },
    };

    const action = messageActions[input.type];

    if (!action) {
      throw new Error('Invalid message type');
    }

    action();
  }
}