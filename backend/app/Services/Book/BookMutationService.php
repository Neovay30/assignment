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

    /**
     * Update an existing book
     */
    public function updateBook(int $id, array $data): ?Book
    {
        $book = $this->bookRepository->findById($id);
        
        if (!$book) {
            return null;
        }
        
        return $this->bookRepository->update($book, $data);
    }

    /**
     * Delete a book
     */
    public function deleteBook(int $id): bool
    {
        $book = $this->bookRepository->findById($id);
        
        if (!$book) {
            return false;
        }
        
        return $this->bookRepository->delete($book);
    }
}