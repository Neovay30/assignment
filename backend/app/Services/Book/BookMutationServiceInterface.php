<?php

namespace App\Services\Book;

use App\Models\Book;

interface BookMutationServiceInterface
{
    /**
     * Create a new book
     */
    public function createBook(array $data): Book;

    /**
     * Update the specified book.
     */
    public function updateBook(int $id, array $data): ?Book;

    /**
     * Delete a book
     */
    public function deleteBook(int $id): bool;
}