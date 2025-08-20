import { DownloadMediaResponse } from '@/infra/services/whatsapp/ports/whatsapp-service.ports';

export interface WhatsAppService {
  downloadMedia(id: string): Promise<DownloadMediaResponse>;
}