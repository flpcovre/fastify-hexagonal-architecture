import { Attachment } from '@/domain/chat/entities/attachment';
import { UpdateAttachmentStatusUseCase } from '@/domain/chat/use-cases/attachments/update-attachment-status.use-case';
import { AttachmentPath } from '@/domain/chat/value-objects/attachment-path';
import { FileStorage } from '@/infra/services/storage/file-storage';
import { WhatsAppService } from '@/infra/services/whatsapp/whatsapp-service';
import { extension as mimeExtension } from 'mime-types';

export class DownloadCustomerAttachmentUseCase {
  constructor(
    private readonly whatsAppService: WhatsAppService,
    private readonly updateAttachmentStatusUseCase: UpdateAttachmentStatusUseCase,
    private readonly fileStorage: FileStorage,
  ) {}

  public async execute(input: Attachment): Promise<void> {
    const ext = mimeExtension(input.mimeType);
    if (!ext) throw new Error(`Could not identify extension for MIME type ${input.mimeType}`);

    const media = await this.whatsAppService.downloadMedia(input.mediaKey);
    const filePath = AttachmentPath.create(input.id, ext);

    try {
      await this.fileStorage.saveFile(filePath.toString(), media);
      input.toProcessed();
    } catch {
      input.toFailed();
    }

    await this.updateAttachmentStatusUseCase.execute({
      id: input.id,
      path: filePath.toString(),
      status: input.status,
    });
  }
}