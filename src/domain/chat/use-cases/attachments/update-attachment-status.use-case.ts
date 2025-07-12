import { AttachmentStatus } from '@/domain/chat/entities/attachment';
import { AttachmentRepository } from '@/domain/chat/ports/attachment-repository';

interface UpdateAttachmentStatusInputDto {
  id: string;
  url: string;
  status: AttachmentStatus;
}

export class UpdateAttachmentStatusUseCase {
  constructor(
    private readonly attachmentRepository: AttachmentRepository,
  ) {}

  public async execute(input: UpdateAttachmentStatusInputDto): Promise<void> {
    await this.attachmentRepository.updateStatus(input.id, input.status, input.url);
  }
}