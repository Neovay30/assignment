import { useState } from "react";

import { useCallback } from "react";
import { bookService } from "../../../services/api/bookService";
import { BookCreateInput } from "../../../types/book";

export const useCreateBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createBook = useCallback(async (bookData: BookCreateInput) => {
    setLoading(true);
    setError(null);
    try {
      const newBook = await bookService.create(bookData);
      return newBook;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create book");
      console.error("Error creating book:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createBook,
  };
};
