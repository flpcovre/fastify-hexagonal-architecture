import { HttpClient, HttpError, HttpHeaders, HttpInterceptor, HttpRequestError, HttpRequestOptions, HttpResponse, HttpResponseError } from '@/infra/services/http/http-service';
import { AxiosError, AxiosInstance, default as axiosDefault } from 'axios';

export class AxiosHttpClient implements HttpClient {
  private readonly axios: AxiosInstance;
  private interceptors: HttpInterceptor[] = [];

  constructor() {
    this.axios = axiosDefault.create({
      responseType: 'json',
    });
  }

  public use(interceptor: HttpInterceptor): void {
    this.interceptors.push(interceptor);
  }

  public async request<TResponse = unknown, TBody = unknown>(options: HttpRequestOptions<TBody>): Promise<HttpResponse<TResponse>>  {
    for (const i of this.interceptors) {
      if (i.onRequest) options = await i.onRequest(options);
    }

    try {
      const res = await this.axios.request<TResponse>({
        url: options.ignoreBaseUrl
          ? options.url
          : options.baseUrl
            ? options.baseUrl + options.url
            : options.url,
        method: options.method,
        headers: options.headers,
        params: options.query,
        data: options.body,
        responseType: options.responseType ?? 'json',
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
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (this.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          throw new HttpResponseError({
            status: axiosError.response.status,
            statusText: axiosError.response.statusText,
            headers: (axiosError.response.headers ?? {}) as HttpHeaders,
            url: axiosError.config?.url ?? options.url,
            data: axiosError.response.data,
            raw: axiosError.response,
          });
        } else if (axiosError.request) {
          throw new HttpRequestError(
            {
              status: 0,
              statusText: 'Network Error',
              headers: {},
              url: axiosError.config?.url ?? options.url,
              data: null,
              raw: axiosError.request,
            },
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      }

      throw new HttpRequestError(
        {
          status: 0,
          statusText: 'Unknown Error',
          headers: {},
          url: options.url,
          data: null,
          raw: error,
        },
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  private isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError === true;
  }

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