import { bookService } from "../../../services/api/bookService";
import { useCallback, useState } from "react";
import { getErrorMessage } from "../../../utils/errorUtils";

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
        const errorMessage = getErrorMessage(err, `Failed to fetch book ${id}`);
        setError(errorMessage);
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
