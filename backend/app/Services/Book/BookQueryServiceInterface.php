<?php

namespace App\Services\Book;

use App\DataTransferObjects\Book\BookQueryOptions;
use App\Models\Book;
use Illuminate\Pagination\LengthAwarePaginator;

interface BookQueryServiceInterface
{
    /**
     * Get paginated books with optional filtering and sorting
     * 
     * @param BookQueryOptions $options
     * @return LengthAwarePaginator
     */
    public function getAllBooks(BookQueryOptions $options): LengthAwarePaginator;
    
    /**
     * Get a book by ID
     * 
     * @param int $id
     * @return Book|null
     */
    public function getBookById(int $id): ?Book;
}