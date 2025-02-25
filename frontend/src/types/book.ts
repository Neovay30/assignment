export interface Book {
  id: number;
  title: string;
  author: string;
}

export type BookCreateInput = Omit<Book, 'id'>;
export type BookUpdateInput = Pick<Book, 'author'>;

export interface FetchBooksParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}