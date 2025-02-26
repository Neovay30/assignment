import { createColumnHelper } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Book } from '../../../types/book';

interface BookColumnsProps {
  onEditClick?: (book: Book) => void;
  onDeleteClick: (id: number) => void;
}

export const useBookColumns = ({
  onEditClick,
  onDeleteClick,
}: BookColumnsProps) => {
  const columnHelper = createColumnHelper<Book>();

  return [
    columnHelper.accessor('title', {
      header: () => <span>Title</span>,
      cell: info => <span className="font-medium">{info.getValue()}</span>,
      enableSorting: true,
      size: 300,
    }),
    columnHelper.accessor('author', {
      header: () => <span>Author</span>,
      cell: info => <span>{info.getValue()}</span>,
      enableSorting: true,
      size: 200,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span>Actions</span>,
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEditClick?.(row.original)}
            className="text-blue-500 hover:text-blue-700"
            aria-label="Edit"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => onDeleteClick(row.original.id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
      size: 100,
    }),
  ];
}; 