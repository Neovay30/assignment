import { useCallback, useState } from 'react';
import { bookService } from '../../../services/api/bookService';
import { FetchBooksParams, Book } from '../../../types/book';
import { getErrorMessage } from '../../../utils/errorUtils';

export const useFetchBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

  const fetchBooks = useCallback(async (params: FetchBooksParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookService.getAll(params);
      setBooks(response.data);
      setTotalPages(response.meta.last_page);
      setTotalItems(response.meta.total);
      return response;
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to fetch books');
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {
    books,
    loading,
    error,
    totalPages,
    totalItems,
    fetchBooks
  };
};