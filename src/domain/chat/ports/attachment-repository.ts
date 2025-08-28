import { Attachment, AttachmentStatus } from '@/domain/chat/entities/attachment';

export interface AttachmentRepository {
  create(attachment: Attachment): Promise<void>;
  updateStatus(id: string, status: AttachmentStatus, path: string): Promise<void>;
  save(attachment: Attachment): Promise<void>;
}