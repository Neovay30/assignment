import { Book, BookCreateInput, BookUpdateInput, FetchBooksParams } from '../../types/book';
import { ExportOptions } from '../../types/export';
import axiosInstance from './axios';

interface PaginatedResponse<T> {
  books: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export const bookService = {
  getAll: async (params: FetchBooksParams = {}): Promise<PaginatedResponse<Book>> => {
    const response = await axiosInstance.get<PaginatedResponse<Book>>('/book', {
      params: {
        page: params.page || 1,
        per_page: params.perPage || 10,
        search: params.search || '',
        sort_by: params.sortBy || '',
        sort_direction: params.sortDirection || '',
      }
    });
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await axiosInstance.get<Book>(`/book/${id}`);
    return response.data;
  },

  create: async (book: BookCreateInput): Promise<Book> => {
    const response = await axiosInstance.post<Book>('/book', book);
    return response.data;
  },

  update: async (id: number, book: BookUpdateInput): Promise<Book> => {
    const response = await axiosInstance.put<Book>(`/book/${id}`, book);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/book/${id}`);
  },

  exportBooks: async (options: ExportOptions) => {
    return await axiosInstance.post('/book/export', options, {
      responseType: 'blob'
    });
  }
};
