import { useCallback, useState } from "react";
import { bookService } from "../../../services/api/bookService";

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
      setError(
        err instanceof Error ? err.message : `Failed to delete book ${id}`
      );
      console.error(`Error deleting book ${id}:`, err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteBook, loading, error };
};
