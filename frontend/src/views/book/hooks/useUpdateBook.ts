import { useCallback, useState } from "react";

import { bookService } from "../../../services/api/bookService";
import { BookUpdateInput } from "../../../types/book";
import { getErrorMessage } from "../../../utils/errorUtils";

export const useUpdateBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBook = useCallback(
    async (id: number, bookData: BookUpdateInput) => {
      setLoading(true);
      setError(null);
      try {
        const updatedBook = await bookService.update(id, bookData);
        return updatedBook;
      } catch (err) {
        const errorMessage = getErrorMessage(err, `Failed to update book ${id}`);
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    updateBook,
    loading,
    error,
  };
};
