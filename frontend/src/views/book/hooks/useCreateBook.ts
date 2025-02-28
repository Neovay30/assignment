import { useCallback, useState } from "react";

import { bookService } from "../../../services/api/bookService";
import { BookCreateInput } from "../../../types/book";
import { getErrorMessage } from "../../../utils/errorUtils";
import { AxiosError } from "axios";

export const useCreateBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createBook = useCallback(async (bookData: BookCreateInput) => {
    setLoading(true);
    setError(null);

    try {
      const newBook = await bookService.create(bookData);
      return { success: true, data: newBook };
    } catch (err) {
      const errorMessage = getErrorMessage(err, "Failed to create book");
      setError(errorMessage)
      
      if (err instanceof AxiosError) {
        const responseErrors = err.response?.data?.errors;
        if (responseErrors) {
          return { success: false, errors: responseErrors };
        }
      }

      return { success: false, errors: { general: errorMessage } };
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
