<?php

namespace App\Services\Book;

use App\Models\Book;

interface BookMutationServiceInterface
{
    /**
     * Create a new book
     * 
     * @param array<string, mixed> $data
     * @return Book
     */
    public function createBook(array $data): Book;

    /**
     * Update the specified book.
     * 
     * @param int $id
     * @param array<string, mixed> $data
     * @return Book|null
     */
    public function updateBook(int $id, array $data): ?Book;

    /**
     * Delete a book
     * 
     * @param int $id
     * @return bool
     */
    public function deleteBook(int $id): bool;
}