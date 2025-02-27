<?php

namespace App\Services\Book;

use App\DataTransferObjects\Book\BookQueryOptions;
use App\Models\Book;
use Illuminate\Pagination\LengthAwarePaginator;

interface BookQueryServiceInterface
{
    /**
     * Get paginated books with optional filtering and sorting
     */
    public function getAllBooks(BookQueryOptions $options): LengthAwarePaginator;
    
    /**
     * Get a book by ID
     */
    public function getBookById(int $id): ?Book;
}