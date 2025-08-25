// export type DownloadMediaResponse = Blob | ArrayBuffer | Buffer;
export type DownloadMediaResponse = Buffer;

export interface RetrieveMediaUrlResponse {
  id: string,
  url: string,
}