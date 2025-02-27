import { useCallback, useState } from "react";
import { bookService } from "../../../services/api/bookService";
import { getErrorMessage } from "../../../utils/errorUtils";

export const useDeleteBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBook = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await bookService.delete(id);
      return true;
    } catch (err) {
      const errorMessage = getErrorMessage(err, `Failed to delete book ${id}`);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteBook, loading, error };
};
