<?php

namespace App\Services\Book;

use App\DataTransferObjects\Book\BookQueryOptions;
use App\Models\Book;
use App\Repositories\BookRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class BookQueryService implements BookQueryServiceInterface
{
    private BookRepositoryInterface $bookRepository;
    
    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }
    
    /**
     * Get paginated books with optional filtering and sorting
     */
    public function getAllBooks(BookQueryOptions $options): LengthAwarePaginator
    {
        return $this->bookRepository->getAllBooks($options);
    }
    
    /**
     * Get a book by ID
     */
    public function getBookById(int $id): ?Book
    {
        return $this->bookRepository->findById($id);
    }
}