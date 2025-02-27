<?php

namespace App\Services\Book;

use App\Models\Book;
use App\Repositories\BookRepositoryInterface;

class BookMutationService implements BookMutationServiceInterface
{
    private BookRepositoryInterface $bookRepository;
    
    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }
    
    /**
     * Create a new book
     */
    public function createBook(array $data): Book
    {
        return $this->bookRepository->create($data);
    }
}