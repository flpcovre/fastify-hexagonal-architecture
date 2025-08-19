import { HttpClient } from '@/infra/services/http/http-service';
import { OfficialAccessToken } from '@/infra/services/whatsapp/official/value-objects/official-access-token.vo';
import { OfficialPhoneNumberId } from '@/infra/services/whatsapp/official/value-objects/official-phone-number-id.vo';
// import { WhatsAppService } from '@/infra/services/whatsapp/whatsapp';

export class WPOfficialService {
  protected readonly accessToken: OfficialAccessToken;
  protected readonly phoneNumberId: OfficialPhoneNumberId;
  protected readonly baseUri = 'https://graph.facebook.com/v23.0';

  constructor(
    private readonly http: HttpClient,
  ) {
    this.accessToken   = new OfficialAccessToken();
    this.phoneNumberId = new OfficialPhoneNumberId();

    this.http.use({
      onRequest: async(opts) => {
        return {
          ...opts,
          headers: { ...opts.headers, Authorization: `Bearer ${this.accessToken.value}` },
        };
      },
    });
  }
}