<?php

namespace App\DataTransferObjects\Book;

class BookQueryOptions
{
    public function __construct(
        public readonly ?string $search = null,
        public readonly ?string $sortBy = 'title',
        public readonly ?string $sortDirection = 'asc',
        public readonly ?int $perPage = 15,
        public readonly ?int $page = 1
    ) {}
    
    /**
     * Create a new BookQueryOptions instance from an array.
     *
     * @param array<string, mixed> $data
     * @return self
     */
    public static function fromArray(array $data): self
    {
        return new self(
            search: $data['search'] ?? null,
            sortBy: $data['sort_by'] ?? 'title',
            sortDirection: $data['sort_direction'] ?? 'asc',
            perPage: $data['per_page'] ?? 15,
            page: $data['page'] ?? 1
        );
    }
}