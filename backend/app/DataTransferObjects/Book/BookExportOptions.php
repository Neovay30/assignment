<?php

namespace App\DataTransferObjects\Book;

class BookExportOptions
{
    public function __construct(
        public readonly string $format,
        public readonly bool $includeTitle,
        public readonly bool $includeAuthor
    ) {}
    
    public static function fromArray(array $data): self
    {
        return new self(
            format: $data['format'],
            includeTitle: $data['includeTitle'],
            includeAuthor: $data['includeAuthor']
        );
    }
}