import { bookService } from "../../../services/api/bookService";
import { useCallback, useState } from "react";

export const useFetchBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBook = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        return await bookService.getById(id);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : `Failed to fetch book ${id}`
        );
        console.error(`Error fetching book ${id}:`, err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  return {
    loading,
    error,
    fetchBook,
  };
};
