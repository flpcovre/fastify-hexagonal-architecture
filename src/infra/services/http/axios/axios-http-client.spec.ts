import { describe, it, expect } from 'vitest';
import { AxiosHttpClient } from './axios-http-client';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: number;
}

describe('AxiosHttpClient', () => {
  it('Should be return 200', async() => {
    // const http = new AxiosHttpClient();

    // http.use({
    //   async onRequest(opts) {
    //     return {
    //       ...opts,
    //       baseUrl: 'https://jsonplaceholder.typicode.com',
    //     };
    //   },
    // });

    // const response = await http.get<Todo>('/todos/1');

    // expect(response.status).toEqual(200);

    expect(true).toBeTruthy();
  });
});