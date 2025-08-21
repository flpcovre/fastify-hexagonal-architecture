import { WHATSAPP_INTEGRATION } from '@/config/whatsapp.config';
import { WhatsAppServiceFactory } from '@/infra/factories/services/whatsapp-service.factory';
import { DownloadMediaResponse } from '@/infra/services/whatsapp/ports/whatsapp-service.ports';

export interface WhatsAppService {
  downloadMedia(id: string): Promise<DownloadMediaResponse>;
}

export const GlobalWhatsAppServiceInstance = WhatsAppServiceFactory.create(WHATSAPP_INTEGRATION);