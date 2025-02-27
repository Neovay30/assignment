import React, { Suspense } from 'react';

import { Table } from "../../../components/ui/Table";
import { TableHeader } from "../../../components/ui/Table/TableHeader";
import { TableFooter } from "../../../components/ui/Table/TableFooter";
import { useTableInstance } from "../../../hooks/useTableInstance";
import { useBookColumns } from "../hooks/useBookColumns";
import Button from "../../../components/ui/Button";
import { FaPlus, FaFileExport } from "react-icons/fa";
import { useFetchBooks } from "../hooks/useFetchBooks";
import { useEffect, useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useDebounce } from "../../../hooks/useDebounce";
import { useDeleteBook } from "../hooks/useDeleteBook";
import toast from "react-hot-toast";
import { FetchBooksParams } from "../../../types/book";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

// Lazy load to prevent from loading components that are not used
const BookDeleteModal = React.lazy(() => import('./BookDeleteModal'));
const BookFormModal = React.lazy(() => import('./BookFormModal'));
const BookExportModal = React.lazy(() => import('./BookExportModal'));

enum ModalType {
  NONE = "NONE",
  BOOK_FORM = "BOOK_FORM",
  DELETE_CONFIRM = "DELETE_CONFIRM",
  BOOK_EXPORT = "BOOK_EXPORT",
}

const BooksTable = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);
  const { books, loading, error, totalItems, totalPages, fetchBooks } =
    useFetchBooks();
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
      sortDirection:
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
    });
  }, [pagination, sorting, debouncedSearchTerm]);

  const columns = useBookColumns({
    onEditClick: (bookId: number) => {
      setSelectedBookId(bookId);
      setActiveModal(ModalType.BOOK_FORM);
    },
    onDeleteClick: (bookId: number) => {
      setSelectedBookId(bookId);
      setActiveModal(ModalType.DELETE_CONFIRM);
    },
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
      <Button
        variant="default"
        className="flex items-center gap-1"
        onClick={() => setActiveModal(ModalType.BOOK_FORM)}
      >
        <FaPlus size={14} />
        Add Book
      </Button>
      <Button 
        variant="outline" 
        className="flex items-center gap-1" 
        onClick={() => setActiveModal(ModalType.BOOK_EXPORT)}
      >
        <FaFileExport size={14} />
        Export
      </Button>
    </>
  );

  const getCurrentQueryParams = (): FetchBooksParams => {
    return {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: debouncedSearchTerm,
      sortBy: sorting.length > 0 ? sorting[0].id : undefined,
      sortDirection:
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
    };
  };

  /** ---------------------------- Modals logic ---------------------------- */

  const [selectedBookId, setSelectedBookId] = useState<number | undefined>(
    undefined
  );

  const { deleteBook, error: deleteError } = useDeleteBook();

  const handleConfirmDelete = async () => {
    if (!selectedBookId) return;

    const success = await deleteBook(selectedBookId);

    if (success) {
      toast.success("Book deleted successfully");
    } else {
      toast.error(deleteError || "Failed to delete book");
    }

    setActiveModal(ModalType.NONE);
    setSelectedBookId(undefined);
    fetchBooks(getCurrentQueryParams());
  };

  const handleFormSuccess = () => {
    toast.success(
      selectedBookId ? "Book updated successfully" : "Book created successfully"
    );
    setActiveModal(ModalType.NONE);
    setSelectedBookId(undefined);
    fetchBooks(getCurrentQueryParams());
  };

  const handleFormError = (error: string) => {
    toast.error(error);
  };

  const handleModalClose = () => {
    setActiveModal(ModalType.NONE);
    setSelectedBookId(undefined);
  };

  return (
    <div className="flex flex-col h-full">
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

      <TableFooter table={table} totalItems={totalItems || 0} />

      <Suspense fallback={<LoadingSpinner message="Loading modal..." />}>
        {activeModal === ModalType.DELETE_CONFIRM && (
          <BookDeleteModal
            onClose={handleModalClose}
            onConfirm={handleConfirmDelete}
          />
        )}

        {activeModal === ModalType.BOOK_FORM && (
          <BookFormModal
            onClose={handleModalClose}
            bookId={selectedBookId}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        )}

        {activeModal === ModalType.BOOK_EXPORT && (
          <BookExportModal
            onClose={handleModalClose}
            totalItems={totalItems || 0}
          />
        )}
      </Suspense>
    </div>
  );
};

export default BooksTable;
