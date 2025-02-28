<?php

namespace App\DataTransferObjects\Book;

class BookExportOptions
{
    public function __construct(
        public readonly string $format,
        public readonly bool $includeTitle,
        public readonly bool $includeAuthor
    ) {}
    
    /**
     * Create a new BookExportOptions instance from an array.
     *
     * @param array<string, mixed> $data
     * @return self
     */
    public static function fromArray(array $data): self
    {
        return new self(
            format: $data['format'],
            includeTitle: $data['includeTitle'],
            includeAuthor: $data['includeAuthor']
        );
    }
}