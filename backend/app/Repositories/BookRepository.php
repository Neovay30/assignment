<?php

namespace App\Repositories;

use App\DataTransferObjects\Book\BookQueryOptions;
use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class BookRepository implements BookRepositoryInterface
{
    /**
     * Get all books with optional filtering and pagination
     */
    public function getAllBooks(?BookQueryOptions $options = null): LengthAwarePaginator
    {
        $options = $options ?? new BookQueryOptions();
        $query = Book::query();
        
        if ($options->search) {
            $query->where(function ($q) use ($options) {
                $q->where('title', 'like', "%{$options->search}%")
                  ->orWhere('author', 'like', "%{$options->search}%");
            });
        }
        
        $query->orderBy($options->sortBy, $options->sortDirection);
        
        return $query->paginate($options->perPage, ['*'], 'page', $options->page);
    }
    
    /**
     * Find a book by ID
     */
    public function findById(int $id): ?Book
    {
        return Book::find($id);
    }
    
    /**
     * Create a new book
     */
    public function create(array $data): Book
    {
        return Book::create($data);
    }
    
    /**
     * Update an existing book
     */
    public function update(Book $book, array $data): Book
    {
        $book->update($data);
        return $book->fresh();
    }
    
    /**
     * Delete a book
     */
    public function delete(Book $book): bool
    {
        return $book->delete();
    }

    /**
     * Get all books without pagination
     */
    public function getAll(): Collection
    {
        return Book::orderBy('title', 'asc')->get();
    }
}