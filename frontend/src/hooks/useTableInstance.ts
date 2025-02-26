import {
    getCoreRowModel,
    useReactTable,
    type TableOptions,
    type Table as TanStackTable,
  } from '@tanstack/react-table';
  
/**
 * Custom hook that creates a table instance with the core row model already configured.
 * 
 * @param options - Table options excluding the core row model
 * @returns TanStack table instance
 * 
 * @example
 * const table = useTableInstance({
 *   data: books,
 *   columns,
 *   state: { sorting, pagination },
 *   onSortingChange: setSorting,
 *   onPaginationChange: setPagination,
 * });
 */
export function useTableInstance<TData>(
    options: Omit<TableOptions<TData>, 'getCoreRowModel'>
  ): TanStackTable<TData> {
    return useReactTable({
      ...options,
      getCoreRowModel: getCoreRowModel(),
    });
  } 