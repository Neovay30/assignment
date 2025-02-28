import { ReactNode } from 'react';
import Button from '../Button';
import { cn } from '../../../lib/utils';
import { Table } from '@tanstack/react-table';

/**
 * TableFooter component that displays pagination controls, page size selector,
 * and optional action buttons. 
 */

export interface TableFooterProps<TData> {
  table: Table<TData>;
  totalItems?: number;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  actions?: ReactNode;
  className?: string;
  maxPageButtons?: number;
}

export function TableFooter<TData>({
  table,
  totalItems = 0,
  showPageSize = true,
  pageSizeOptions = [10, 25, 50, 100],
  actions,
  className,
  maxPageButtons = 5,
}: TableFooterProps<TData>) {
  const { pageSize, pageIndex } = table.getState().pagination;
  
  const pageCount = table.getPageCount();
  const startPage = Math.max(0, pageIndex - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(pageCount, startPage + maxPageButtons);
  
  return (
    <div className={cn("mt-4 flex flex-col md:flex-row justify-between items-center", className)}>
      {showPageSize && (
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="text-sm text-gray-700">
            Showing {totalItems > 0 ? pageIndex * pageSize + 1 : 0} to{' '}
            {Math.min((pageIndex + 1) * pageSize, totalItems)} of{' '}
            {totalItems} entries
          </span>
          <select
            value={pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center space-x-1 overflow-x-auto">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="outline"
          className="px-3 py-1"
        >
          Previous
        </Button>
        <div className="flex items-center space-x-1">
          {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map(i => (
            <Button
              key={i}
              onClick={() => table.setPageIndex(i)}
              variant={pageIndex === i ? "default" : "outline"}
              className="px-3 py-1 min-w-[40px]"
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant="outline"
          className="px-3 py-1"
        >
          Next
        </Button>
      </div>
      
      {actions && (
        <div className="mt-4 md:mt-0 flex justify-end space-x-2">
          {actions}
        </div>
      )}
    </div>
  );
} 