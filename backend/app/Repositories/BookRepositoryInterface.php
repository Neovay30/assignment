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
     * 
     * @param BookQueryOptions $options
     * @return LengthAwarePaginator
     */
    public function getAllBooks(BookQueryOptions $options): LengthAwarePaginator;
    
    /**
     * Find a book by ID
     * 
     * @param int $id
     * @return Book|null
     */
    public function findById(int $id): ?Book;
    
    /**
     * Create a new book
     * 
     * @param array<string, mixed> $data
     * @return Book
     */
    public function create(array $data): Book;
    
    /**
     * Update an existing book
     * 
     * @param Book $book
     * @param array<string, mixed> $data
     * @return Book
     */
    public function update(Book $book, array $data): Book;
    
    /**
     * Delete a book
     * 
     * @param Book $book
     * @return bool
     */
    public function delete(Book $book): bool;

    /**
     * Get all books without pagination
     * 
     * @return Collection<int, Book>
     */
    public function getAll(): Collection;
}
