import { HttpImpl } from '@/config/http.config';
import { AxiosHttpClient } from '@/infra/services/http/axios/axios-http-client';
import { HttpClient } from '@/infra/services/http/http-service';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HttpServiceFactory {
  static httpServices: Record<HttpImpl, HttpClient> = {
    [HttpImpl.AXIOS]: new AxiosHttpClient(),
  };

  static create(type: HttpImpl): HttpClient {
    const mapper = this.httpServices[type];
    if (!mapper) {
      throw new Error(`HttpServiceMapper not implemented for type: ${type}`);
    }
    return mapper;
  }
}