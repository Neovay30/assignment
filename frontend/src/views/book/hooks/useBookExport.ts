import { useCallback, useState } from 'react';
import { bookService } from '../../../services/api/bookService';
import { ExportOptions } from '../../../types/export';
import { getErrorMessage } from '../../../utils/errorUtils';
export const useBookExport = () => {
  const [error, setError] = useState<string | null>(null);

  const exportBooks = useCallback(async (options: ExportOptions) => {
    try {
      const response = await bookService.exportBooks(options);
      
      if (!response) {
        throw new Error('No response received from the server');
      }
      
      const data = new Blob([response.data], {
        type: options.format === 'csv' ? 'text/csv' : 'application/xml'
      });
      const downloadUrl = window.URL.createObjectURL(data);
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `books-export.${options.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      return true;
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to export books');
      setError(errorMessage);
      return false;
    }
  }, [setError]);

  return {
    error,
    exportBooks
  };
};