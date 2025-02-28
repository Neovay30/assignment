<?php

namespace App\Services\Book;

use App\DataTransferObjects\Book\BookExportOptions;
use Symfony\Component\HttpFoundation\StreamedResponse;

interface BookExportServiceInterface
{
    /**
     * Export books based on the provided options.
     *
     * @param BookExportOptions $options
     * @return StreamedResponse
     */
    public function exportBooks(BookExportOptions $options): StreamedResponse;
}
