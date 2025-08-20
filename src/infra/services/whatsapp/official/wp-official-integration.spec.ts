import { AxiosHttpClient } from '@/infra/services/http/axios/axios-http-client';
// import { OfficialAccessToken } from '@/infra/services/whatsapp/official/value-objects/official-access-token.vo';
import { WPOfficialService } from '@/infra/services/whatsapp/official/wp-official-integration';
import { describe, expect, it } from 'vitest';

import { config } from 'dotenv';
config({ path: '.env' });


describe('WhatsApp Official Integration', () => {
  const http = new AxiosHttpClient();
  const whatsAppService = new WPOfficialService(http);

  it('Deve retornar uma mídia baixada', async() => {
    const mediaId = '1999101257526593';
    const response = await whatsAppService.retrieveMediaUrl(mediaId);

    console.log(response);
    expect(true).toBeTruthy();
  });
});