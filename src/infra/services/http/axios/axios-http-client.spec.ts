import { describe, it, expect } from 'vitest';
import { AxiosHttpClient } from './axios-http-client';

describe('AxiosHttpClient', () => {
  it('Should be return 200', async() => {
    const http = new AxiosHttpClient();

    http.use({
      async onRequest(opts) {
        return {
          ...opts,
          baseUrl: 'https://pokeapi.co/api/v2',
        };
      },
    });

    const response = await http.get('/version/1');

    expect(response.status).toEqual(200);
    console.log(response);
  });
});
