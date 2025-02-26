import { Table } from '../../../components/ui/Table';
import { TableHeader } from '../../../components/ui/Table/TableHeader';
import { TableFooter } from '../../../components/ui/Table/TableFooter';
import { useTableInstance } from '../../../hooks/useTableInstance';
import { useBookColumns } from '../hooks/useBookColumns';
import Button from '../../../components/ui/Button';
import { FaPlus, FaFileExport } from 'react-icons/fa';
import { useFetchBooks } from '../hooks/useFetchBooks';
import { useEffect, useState } from 'react';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useDebounce } from '../../../hooks/useDebounce';

const BooksTable = () => {
    const { books, loading, error, totalItems, totalPages, fetchBooks } = useFetchBooks();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        fetchBooks({
            page: pagination.pageIndex + 1,
            perPage: pagination.pageSize,
            search: debouncedSearchTerm,
            sortBy: sorting.length > 0 ? sorting[0].id : undefined,
            sortDirection: sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined
        });
    }, [pagination, sorting, debouncedSearchTerm, fetchBooks]);

    const columns = useBookColumns({
        onEditClick: () => { },
        onDeleteClick: () => { },
    });


    const table = useTableInstance({
        data: books || [],
        columns,
        state: {
            sorting,
            pagination,
          },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        manualSorting: true,
        manualPagination: true,
        pageCount: totalPages || 1,
    });

    const headerActions = (
        <>
            <Button variant="default" className="flex items-center gap-1">
                <FaPlus size={14} />
                Add Book
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
                <FaFileExport size={14} />
                Export
            </Button>
        </>
    );

    return (
        <div>
            <TableHeader
                title="Books"
                showSearch={true}
                onSearch={setSearchTerm}
                searchPlaceholder="Search books..."
                actions={headerActions}
            />

            <Table
                table={table}
                loading={loading}
                error={error}
                emptyMessage="No books available."
            />

            <TableFooter
                table={table}
                totalItems={totalItems || 0}
            />
        </div>
    );
};

export default BooksTable;