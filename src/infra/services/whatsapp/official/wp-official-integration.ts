import { OfficialAccessToken } from '@/infra/services/whatsapp/official/value-objects/official-access-token.vo';
import { OfficialPhoneNumberId } from '@/infra/services/whatsapp/official/value-objects/official-phone-number-id.vo';

export class WPOfficialService {
  protected readonly accessToken: OfficialAccessToken;
  protected readonly phoneNumberId: OfficialPhoneNumberId;

  protected readonly baseUri: string;
  protected readonly version: string = 'v23.0';

  constructor() {
    this.accessToken   = new OfficialAccessToken();
    this.phoneNumberId = new OfficialPhoneNumberId();

    this.baseUri = `https://graph.facebook.com/${this.version}`;
  }
}