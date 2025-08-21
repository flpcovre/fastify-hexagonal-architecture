import { Attachment } from '@/domain/chat/entities/attachment';
import { UpdateAttachmentStatusUseCase } from '@/domain/chat/use-cases/attachments/update-attachment-status.use-case';
import { WhatsAppService } from '@/infra/services/whatsapp/whatsapp-service';

export class DownloadCustomerAttachmentUseCase {
  constructor(
    private readonly whatsAppService: WhatsAppService,
    private readonly updateAttachmentStatusUseCase: UpdateAttachmentStatusUseCase,
  ) {}

  public async execute(input: Attachment): Promise<void> {
    const media = await this.whatsAppService.downloadMedia(input.mediaKey);

    try {
      input.url = await media.text();
      input.status = 'processed';
    } catch {
      input.status = 'failed';
    }

    await this.updateAttachmentStatusUseCase.execute({
      id: input.id,
      url: input.url ?? '',
      status: input.status,
    });
  }
}