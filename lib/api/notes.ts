import axios from "axios";
import { Note, CreateNoteDto, NoteTag } from "@/types/note";

// 1. Визначаємо базовий URL. 
// Якщо ми на клієнті, достатньо "/api", якщо на сервері — потрібен повний шлях.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Додамо інтерцептор для логування (допоможе побачити, куди саме йде запит)
api.interceptors.request.use((config) => {
  console.log(`🚀 Request sent to: ${config.baseURL}${config.url}`);
  return config;
});

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await api.get<Note[]>("/notes");
  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  // Переконайся, що шлях саме "/notes/${id}", а не "/${id}"
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const getNotesByFilter = async (
  tag: string,
  page: number,
  search: string
) => {
  const { data } = await api.get<Note[]>("/notes", {
    params: {
      tag: tag !== "all" ? tag : undefined,
      search: search || undefined,
      page: page,
      limit: 10,
    },
  });

  return {
    notes: Array.isArray(data) ? data : (data as any).items || [],
    totalPages: (data as any).totalPages || 1,
  };
};

export default api;















/*import axios from 'axios';
import { Note, CreateNoteDto } from '@/types/note';

import axios from "axios";
import { Note, CreateNoteDto, NoteTag } from "@/types/note";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

/*export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page: params.page,
      search: params.search,
      tag: params.tag,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

/*export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const res = await api.post<Note>('/notes', note);
  return res.data;
};*/

/*export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};*/

/*export const getNotes = async () => {
  const { data } = await api.get<Note[]>('/notes');
  return data;
};*/

/*export const getNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};*/

/*export const getNotes = async (): Promise<Note[]> => {
  const { data } = await api.get<Note[]>("/notes");
  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

// Функція для фільтрації та пагінації (MockAPI приклад)
export const getNotesByFilter = async (tag: string, page: number, search: string) => {
  // У реальному API параметри передаються в URL
  const { data } = await api.get<Note[]>("/notes", {
    params: {
      tag: tag !== "all" ? tag : undefined,
      title: search || undefined,
      page: page,
      limit: 10,
    }
  });

  // Оскільки MockAPI може не повертати totalPages, імітуємо структуру для клієнта
  return {
    notes: data,
    totalPages: 5, // Заглушка, якщо API не дає заголовків X-Total-Count
  };
};*/