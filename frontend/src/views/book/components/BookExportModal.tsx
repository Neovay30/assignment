import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import { ExportOptions } from '../../../types/export';
import { useBookExport } from '../hooks/useBookExport';
import { CSV_EXAMPLES, XML_EXAMPLES } from '../constants/exportExamples';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface BookExportModalProps {
  onClose: () => void;
  totalItems: number;
}

const BookExportModal = ({ onClose, totalItems }: BookExportModalProps) => {
  const [format, setFormat] = useState<'csv' | 'xml'>('csv');
  const [includeTitle, setIncludeTitle] = useState(true);
  const [includeAuthor, setIncludeAuthor] = useState(true);
  const [loading, setLoading] = useState(false);
  const { exportBooks, error: exportError } = useBookExport();

  const getExampleKey = () => {
    if (includeTitle && includeAuthor) return 'both';
    if (includeTitle) return 'titleOnly';
    if (includeAuthor) return 'authorOnly';
    return null;
  };

  const exampleKey = getExampleKey();
  const currentExample = format === 'csv' 
    ? (exampleKey ? CSV_EXAMPLES[exampleKey] : '') 
    : (exampleKey ? XML_EXAMPLES[exampleKey] : '');

  const handleExport = async () => {
    setLoading(true);
    
    const options: ExportOptions = {
      format,
      includeTitle,
      includeAuthor,
    };
    
    try {
      const success = await exportBooks(options);
      if (success) {
        toast.success('Books exported successfully');
        onClose();
      } else {
        toast.error(exportError || 'Export failed. Please try again.');
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('An unexpected error occurred during export.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onClose={onClose}
      title="Export Books"
      size="xxl"
    >
      {loading && (
        <LoadingSpinner message="Preparing your download..." />
      )}
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            You are about to export {totalItems} books.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Export Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as 'csv' | 'xml')}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="csv">CSV</option>
            <option value="xml">XML</option>
          </select>
          
          {exampleKey && (
            <div className="mt-1 text-xs text-gray-500">
              Example: <br />
              <div className="overflow-x-auto">
                <code className="bg-gray-100 p-1 rounded whitespace-pre block">
                  {currentExample}
                </code>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Columns to Export
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeTitle"
                checked={includeTitle}
                onChange={() => setIncludeTitle(!includeTitle)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeTitle" className="ml-2 text-sm text-gray-700">
                Title
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeAuthor"
                checked={includeAuthor}
                onChange={() => setIncludeAuthor(!includeAuthor)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeAuthor" className="ml-2 text-sm text-gray-700">
                Author
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            disabled={loading || (!includeTitle && !includeAuthor)}
          >
            {loading ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookExportModal; 