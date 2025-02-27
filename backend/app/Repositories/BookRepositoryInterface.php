<?php

namespace App\Repositories;

use App\DataTransferObjects\Book\BookQueryOptions;
use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface BookRepositoryInterface
{
    /**
     * Get all books with optional filtering and pagination
     */
    public function getAllBooks(BookQueryOptions $options): LengthAwarePaginator;
    
    /**
     * Find a book by ID
     */
    public function findById(int $id): ?Book;
    
    /**
     * Create a new book
     */
    public function create(array $data): Book;
    
    /**
     * Update an existing book
     */
    public function update(Book $book, array $data): Book;
    
    /**
     * Delete a book
     */
    public function delete(Book $book): bool;

    /**
     * Get all books without pagination
     */
    public function getAll(): Collection;
}
