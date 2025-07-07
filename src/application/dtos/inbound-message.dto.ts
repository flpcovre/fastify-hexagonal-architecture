import { MessageType } from '@/domain/chat/entities/message';

export interface InboundMessageDto {
  id: string;
  from: string;
  timestamp: string;
  type: MessageType;
  content: string;
  media?: {
    id: string;
    mimeType: string;
    fileName?: string
    mediaKey?: string;
  }
}