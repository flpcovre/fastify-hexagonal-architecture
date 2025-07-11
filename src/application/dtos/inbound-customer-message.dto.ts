import { MessageType } from '@/domain/chat/entities/message';

export interface InboundCustomerMessageDto {
  id: string;
  name: string;
  from: string;
  timestamp: string;
  type: MessageType;
  content: string;
  media?: {
    id: string;
    type: MessageType;
    mimeType: string;
    fileName?: string
    mediaKey?: string;
  }
}