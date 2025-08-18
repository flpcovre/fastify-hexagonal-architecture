import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequestOptions, HttpResponse } from '@/infra/services/http/http-service';
import { Axios } from 'axios';

export class AxiosHttpClient implements HttpClient {
  private readonly axios = new Axios();
  private interceptors: HttpInterceptor[] = [];

  public use(interceptor: HttpInterceptor): void {
    this.interceptors.push(interceptor);
  }

  public async request<TResponse = unknown, TBody = unknown>(options: HttpRequestOptions<TBody>): Promise<HttpResponse<TResponse>>  {
    for (const i of this.interceptors) {
      if (i.onRequest) options = await i.onRequest(options);
    }

    try {
      const res = await this.axios.request<TResponse>({
        url: options.url,
        method: options.method,
        headers: options.headers,
        params: options.query,
        data: options.body,
        responseType: options.responseType,
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
      throw new Error(`Error: ${e}`);
    }
  };

  public async get<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'> | undefined): Promise<HttpResponse<T>> {
    return await this.request<T>({ url, ...opts, method: 'GET' });
  }

  public async delete<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'> | undefined): Promise<HttpResponse<T>> {
    return await this.request<T>({ url, ...opts, method: 'DELETE' });
  }

  public async head<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'> | undefined): Promise<HttpResponse<T>> {
    return await this.request<T>({ url, ...opts, method: 'HEAD' });
  }

  public async options<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'> | undefined): Promise<HttpResponse<T>> {
    return await this.request<T>({ url, ...opts, method: 'OPTIONS' });
  }

  public async post<T = unknown, B = unknown>(url: string, body?: B | undefined, opts?: Omit<HttpRequestOptions<B>, 'url' | 'method' | 'body'> | undefined): Promise<HttpResponse<T>> {
    return await this.request<T, B>({ url, ...opts, method: 'POST', body });
  }

  public async put<T = unknown, B = unknown>(url: string, body?: B | undefined, opts?: Omit<HttpRequestOptions<B>, 'url' | 'method' | 'body'> | undefined): Promise<HttpResponse<T>> {
    return await this.request<T, B>({ url, ...opts, method: 'PUT', body });
  }

  public async patch<T = unknown, B = unknown>(url: string, body?: B | undefined, opts?: Omit<HttpRequestOptions<B>, 'url' | 'method' | 'body'> | undefined): Promise<HttpResponse<T>> {
    return await this.request<T, B>({ url, ...opts, method: 'PATCH', body });
  }
}