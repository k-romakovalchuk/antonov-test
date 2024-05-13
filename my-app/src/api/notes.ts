import { client } from '../utils/axiosClient';
import { Note, PostNote } from '../type';

export const getNotes = () => {
  return client.get<Note[]>();
};

export const getNote = (noteId: number) => {
  return client.getOne<Note>(`/${noteId}`);
};

export const createNote = (data: PostNote) => {
  return client.post<Note>(data);
};

export const updateNote = (data: any) => {
  return client.patch<Note>(data);
};

export const deleteNote = (noteId: number) => {
  return client.delete(`/${noteId}`);
};
