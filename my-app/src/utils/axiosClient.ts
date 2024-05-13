import axios from 'axios';
import { PostNote } from '../type';
export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const client = {
  async get<T>() {
    const response = await instance.get<T>(BASE_URL);

    return response.data;
  },

  async getOne<T>(url: string) {
    const response = await instance.get<T>(url);

    return response.data;
  },

  async post<T>(data: PostNote) {
    const response = await instance.post<T>(BASE_URL, data);

    return response.data;
  },

  async patch<T>(data: any) {
    const response = await instance.patch<T>(`${BASE_URL}/${data.id}`, {title: data.title, body: data.body});

    return response.data;
  },

  async delete(url: string) {
    return await instance.delete(url);
  },
};
