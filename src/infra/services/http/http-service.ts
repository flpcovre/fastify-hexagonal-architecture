export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
export type HttpHeaders = Record<string, string>;
export type ResponseType = 'json' | 'text' | 'blob' | 'arraybuffer';

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number | boolean | null | undefined)[];

export type QueryParams = Record<string, QueryValue>;

export interface HttpRequestOptions<TBody = unknown> {
  url: string;
  method: HttpMethod;
  headers?: HttpHeaders;
  body?: TBody;
  query?: QueryParams;
  responseType?: ResponseType;
}

export interface HttpResponse<TData = unknown> {
  status: number;
  statusText: string;
  headers: HttpHeaders;
  data: TData;
  url?: string;
  raw?: unknown;
}

export interface HttpInterceptor {
  onRequest?<B = unknown>(options: HttpRequestOptions<B>): Promise<HttpRequestOptions<B>> | HttpRequestOptions<B>;
  onResponse?<R = unknown>(response: HttpResponse<R>): Promise<HttpResponse<R>> | HttpResponse<R>;
}

export interface HttpClient {
  use(interceptor: HttpInterceptor): void;

  request<TResponse = unknown, TBody = unknown>(
    options: HttpRequestOptions<TBody>
  ): Promise<HttpResponse<TResponse>>;

  get<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'>): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'>): Promise<HttpResponse<T>>;
  head<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'>): Promise<HttpResponse<T>>;
  options<T = unknown>(url: string, opts?: Omit<HttpRequestOptions<never>, 'url' | 'method'>): Promise<HttpResponse<T>>;

  post<T = unknown, B = unknown>(url: string, body?: B, opts?: Omit<HttpRequestOptions<B>, 'body' | 'url' | 'method'>): Promise<HttpResponse<T>>;
  put<T = unknown, B = unknown>(url: string, body?: B, opts?: Omit<HttpRequestOptions<B>, 'body' | 'url' | 'method'>): Promise<HttpResponse<T>>;
  patch<T = unknown, B = unknown>(url: string, body?: B, opts?: Omit<HttpRequestOptions<B>, 'body' | 'url' | 'method'>): Promise<HttpResponse<T>>;
}