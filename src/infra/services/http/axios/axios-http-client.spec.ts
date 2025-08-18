import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosHttpClient } from './axios-http-client';
import { Axios } from 'axios';

vi.mock('axios', () => {
  return {
    Axios: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('AxiosHttpClient', () => {
  let client: AxiosHttpClient;
  let mockRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    client = new AxiosHttpClient();
    // pega o mock da instância
    mockRequest = (Axios as unknown as ReturnType<typeof vi.fn>).mock.results[0].value.request;
    mockRequest.mockReset();
  });

  it('Should do a GET and return a formatted response', async() => {
    mockRequest.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      data: { message: 'sucesso' },
      request: { responseURL: 'http://localhost/test' },
    });

    const response = await client.get<{ message: string }>('http://localhost/test');

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'http://localhost/test',
        method: 'GET',
      }),
    );

    expect(response).toEqual({
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      data: { message: 'sucesso' },
      url: 'http://localhost/test',
      raw: expect.any(Object),
    });
  });

  it('Should be throw error when axios fails', async() => {
    mockRequest.mockRejectedValueOnce(new Error('Falha na request'));

    await expect(client.get('http://localhost/test')).rejects.toThrowError();
  });
});
