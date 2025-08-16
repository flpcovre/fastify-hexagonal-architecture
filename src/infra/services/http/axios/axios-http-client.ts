import { HttpClient, HttpHeaders, HttpRequestOptions, HttpResponse } from '@/infra/services/http/http-service';
import { Axios, AxiosInstance, ResponseType } from 'axios';

export class AxiosHttpClient implements HttpClient {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = new Axios();
  }

  public async request<TResponse = unknown, TBody = unknown>(options: HttpRequestOptions<TBody>):Promise<HttpResponse<TResponse>>  {
    try {
      const res = await this.axios.request<TResponse>({
        url: options.url,
        method: options.method,
        headers: options.headers,
        params: options.query,
        data: options.body,
        responseType: options.responseType as ResponseType,
      });

      const response: HttpResponse<TResponse> = {
        status: res.status,
        statusText: res.statusText ?? '',
        headers: (res.headers ?? {}) as HttpHeaders,
        data: res.data,
        url: res.request?.responseURL ?? options.url,
        raw: res,
      };

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  public async get<T = unknown>(url: string, opts?: HttpRequestOptions<never> | undefined): Promise<HttpResponse<T>> {
    return await this.request();
  }
  public async delete<T = unknown>(url: string, opts?: HttpRequestOptions<never> | undefined): Promise<HttpResponse<T>> {
    const response = await this.axios.delete(url, opts);

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as HttpHeaders,
      data: response.data,
    };
  }
  public async head<T = unknown>(url: string, opts?: HttpRequestOptions<never> | undefined): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
  public async options<T = unknown>(url: string, opts?: HttpRequestOptions<never> | undefined): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
  public async post<T = unknown, B = unknown>(url: string, body?: B | undefined, opts?: Omit<HttpRequestOptions<B>, 'body'> | undefined): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
  public async put<T = unknown, B = unknown>(url: string, body?: B | undefined, opts?: Omit<HttpRequestOptions<B>, 'body'> | undefined): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
  public async patch<T = unknown, B = unknown>(url: string, body?: B | undefined, opts?: Omit<HttpRequestOptions<B>, 'body'> | undefined): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
}