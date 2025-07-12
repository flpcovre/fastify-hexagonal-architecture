import { MessageType } from '@/domain/chat/entities/message';

interface InboundFileDto {
  name: string;
  type: string;
  size: number;
  data: Buffer | ArrayBuffer | Blob | string;
}

export interface InboundUserMessageDto {
  chatId: string;
  senderUserId: string;
  date: Date;
  content: string;
  type: MessageType;
  file?: InboundFileDto;
}