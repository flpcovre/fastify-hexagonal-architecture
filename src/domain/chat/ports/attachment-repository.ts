import { Attachment } from '@/domain/chat/entities/attachment';

export interface AttachmentRepository {
  create(attachment: Attachment): Promise<void>;
}