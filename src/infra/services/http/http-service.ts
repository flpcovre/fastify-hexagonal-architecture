export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
export type HttpHeaders = Record<string, string>;
export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer';

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
  method?: HttpMethod;
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

export interface HttpClient {
  request<TResponse = unknown, TBody = unknown>(
    options: HttpRequestOptions<TBody>
  ): Promise<HttpResponse<TResponse>>;

  get<T = unknown>(url: string, opts?: HttpRequestOptions<never>): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, opts?: HttpRequestOptions<never>): Promise<HttpResponse<T>>;
  head<T = unknown>(url: string, opts?: HttpRequestOptions<never>): Promise<HttpResponse<T>>;
  options<T = unknown>(url: string, opts?: HttpRequestOptions<never>): Promise<HttpResponse<T>>;

  post<T = unknown, B = unknown>(url: string, body?: B, opts?: Omit<HttpRequestOptions<B>, 'body'>): Promise<HttpResponse<T>>;
  put<T = unknown, B = unknown>(url: string, body?: B, opts?: Omit<HttpRequestOptions<B>, 'body'>): Promise<HttpResponse<T>>;
  patch<T = unknown, B = unknown>(url: string, body?: B, opts?: Omit<HttpRequestOptions<B>, 'body'>): Promise<HttpResponse<T>>;
}