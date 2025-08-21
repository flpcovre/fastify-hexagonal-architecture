import { HttpClient, HttpInterceptor } from '@/infra/services/http/http-service';
import { OfficialRetrieveMediaUrlResponse } from '@/infra/services/whatsapp/official/dtos/official-payloads.dto';
import { OfficialAccessToken } from '@/infra/services/whatsapp/official/value-objects/official-access-token.vo';
import { OfficialPhoneNumberId } from '@/infra/services/whatsapp/official/value-objects/official-phone-number-id.vo';
import { DownloadMediaResponse } from '@/infra/services/whatsapp/ports/whatsapp-service.ports';
import { WhatsAppService } from '@/infra/services/whatsapp/whatsapp-service';

interface WPOfficialServiceConfig {
  baseUri?: string;
  accessToken?: OfficialAccessToken;
  phoneNumberId?: OfficialPhoneNumberId;
}

export class WPOfficialService implements WhatsAppService {
  private   readonly http: HttpClient;
  protected readonly accessToken: OfficialAccessToken;
  protected readonly phoneNumberId: OfficialPhoneNumberId;
  protected readonly baseUri: string;

  constructor(http: HttpClient, config: WPOfficialServiceConfig = {}) {
    this.http          = http;
    this.accessToken   = config.accessToken   ?? new OfficialAccessToken();
    this.phoneNumberId = config.phoneNumberId ?? new OfficialPhoneNumberId();
    this.baseUri       = config.baseUri       ?? 'https://graph.facebook.com/v23.0/';

    this.registerDefaultInterceptor();
  }

  private registerDefaultInterceptor(): void {
    const interceptor: HttpInterceptor = {
      onRequest: async(opts) => ({
        ...opts,
        baseUrl: this.baseUri,
        headers: {
          ...opts.headers,
          Authorization: `Bearer ${this.accessToken.value}`,
        },
      }),
    };

    this.http.use(interceptor);
  }

  private async retrieveMediaUrl(id: string): Promise<OfficialRetrieveMediaUrlResponse> {
    const response = await this.http.get<OfficialRetrieveMediaUrlResponse>(id);
    return response.data;
  }

  public async downloadMedia(id: string): Promise<DownloadMediaResponse> {
    const retrieveMediaResponse   = await this.retrieveMediaUrl(id);
    const downloadedMediaResponse = await this.http.get<DownloadMediaResponse>(retrieveMediaResponse.url, { ignoreBaseUrl: true, responseType: 'blob' });

    return downloadedMediaResponse.data;
  }
}
