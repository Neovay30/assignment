<?php

namespace App\Services\Book;

use App\DataTransferObjects\Book\BookExportOptions;
use Symfony\Component\HttpFoundation\StreamedResponse;

interface BookExportServiceInterface
{
    /**
     * Export books
     */
    public function exportBooks(BookExportOptions $options): StreamedResponse;
}
