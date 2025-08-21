import { AxiosHttpClient } from '@/infra/services/http/axios/axios-http-client';
import { WPOfficialService } from '@/infra/services/whatsapp/official/wp-official-integration';
import { describe, expect, it } from 'vitest';

import { config } from 'dotenv';
config({ path: '.env' });

describe('WhatsApp Official Integration', () => {
  const http = new AxiosHttpClient();
  const whatsAppService = new WPOfficialService(http);

  it('Deve retornar uma mídia baixada', async() => {
    const mediaId = '2129887934105336';
    const response = await whatsAppService.downloadMedia(mediaId);

    console.log(response);
    expect(true).toBeTruthy();
  });
});