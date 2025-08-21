import { WhatsAppIntegrations } from '@/config/whatsapp.config';
import { GlobalHttpServiceInstance } from '@/infra/services/http/http-service';
import { WPOfficialService } from '@/infra/services/whatsapp/official/wp-official-integration';
import { WhatsAppService } from '@/infra/services/whatsapp/whatsapp-service';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class WhatsAppServiceFactory {
  static whatsAppServices: Record<WhatsAppIntegrations, WhatsAppService> = {
    [WhatsAppIntegrations.OFFICIAL]: new WPOfficialService(GlobalHttpServiceInstance),
  };

  static create(type: WhatsAppIntegrations): WhatsAppService {
    const mapper = this.whatsAppServices[type];

    if (!mapper) {
      throw new Error(`WhatsAppService not implemented for type: ${type}`);
    }

    return mapper;
  }
}