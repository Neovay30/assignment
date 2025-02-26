import React from 'react';
import {
  flexRender,
  type Table as TanStackTable,
} from '@tanstack/react-table';
import { cn } from '../../../lib/utils';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

/**
 * Table component with support for sorting, empty states, loading states, and error handling.
 */

export interface TableProps<TData> extends React.HTMLAttributes<HTMLTableElement> {
  table: TanStackTable<TData>;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export function Table<TData>({
  table,
  loading = false,
  error = null,
  emptyMessage = 'No data available.',
  className,
  ...props
}: TableProps<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="w-full overflow-auto">
        <table className={cn("min-w-full divide-y divide-gray-200 border-collapse", className)} {...props}>
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    scope="col"
                    className={cn(
                      "px-6 py-3",
                      "text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r last:border-r-0 border-gray-200"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ 
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                      width: header.column.getSize() ? `${header.column.getSize()}px` : 'auto',
                      minWidth: header.column.getSize() ? `${header.column.getSize()}px` : 'auto'
                    }}
                    aria-sort={header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? 'descending' : 'ascending') : undefined}
                  >
                    <div className="flex items-center">
                      {!header.isPlaceholder && flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="ml-1" aria-hidden="true">
                          {header.column.getIsSorted() === 'asc' ? (
                            <FaSortUp className="h-4 w-4" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <FaSortDown className="h-4 w-4" />
                          ) : (
                            <FaSort className="h-4 w-4 opacity-30" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          {rows.length === 0 ? (
            <tbody>
              <tr>
                <td 
                  colSpan={table.getAllColumns().length} 
                  className="px-6 py-8 text-center text-gray-600"
                >
                  {loading ? (
                    <span role="status" aria-live="polite">Loading data...</span>
                  ) : error ? (
                    <span role="alert">Error: {error}</span>
                  ) : (
                    emptyMessage
                  )}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td 
                      key={cell.id} 
                      className="px-6 py-4 whitespace-nowrap text-gray-800 border-r last:border-r-0 border-gray-200"
                      style={{ 
                        width: cell.column.getSize() ? `${cell.column.getSize()}px` : 'auto',
                        minWidth: cell.column.getSize() ? `${cell.column.getSize()}px` : 'auto'
                      }}
                      
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

Table.displayName = 'Table';
